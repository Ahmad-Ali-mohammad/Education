from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Any, Dict
import uuid
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

app = FastAPI(title="Enterprise CMS API")
api_router = APIRouter(prefix="/api")

# ============ MODELS ============

class Token(BaseModel):
    access_token: str
    token_type: str
    user: dict

class UserBase(BaseModel):
    email: str
    name: str
    role: str = "viewer"  # admin, editor, viewer
    avatar: Optional[str] = None
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    avatar: Optional[str] = None
    is_active: Optional[bool] = None
    password: Optional[str] = None

class User(UserBase):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LoginRequest(BaseModel):
    email: str
    password: str

# Site Content Models
class HeroContent(BaseModel):
    title: str = ""
    subtitle: str = ""
    image: str = ""
    cta_text: str = ""
    cta_link: str = ""

class AboutContent(BaseModel):
    title: str = ""
    intro: str = ""
    description: str = ""
    image: str = ""
    vision: str = ""
    mission: str = ""

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    icon: str = "Star"
    title: str = ""
    description: str = ""

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = ""
    description: str = ""
    image: str = ""
    category: str = "latest"  # latest, success_story
    gallery: List[str] = []
    status: str = "ongoing"  # ongoing, completed

class Job(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = ""
    description: str = ""
    skills: str = ""
    location: str = ""
    type: str = ""

class TeamMember(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = ""
    role: str = ""
    departmentId: str = ""
    image: str = ""
    bio: str = ""
    skills: List[str] = []
    experienceYears: int = 0
    certifications: List[str] = []
    achievements: List[str] = []
    social: Dict[str, str] = {}

class Department(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = ""

class Category(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = ""

class Tag(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = ""

class Article(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = ""
    content: str = ""
    image: str = ""
    date: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    categoryId: str = ""
    tagIds: List[str] = []

class Event(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = ""
    description: str = ""
    date: str = ""
    location: str = ""

class DynamicPage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = ""
    slug: str = ""
    content: str = ""
    status: str = "draft"  # published, draft
    isHomepage: bool = False
    seo: Dict[str, str] = {"metaTitle": "", "metaDescription": "", "metaKeywords": ""}

class NavigationLink(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    label: str = ""
    path: str = ""

class MediaItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = ""
    type: str = ""
    size: int = 0
    base64: str = ""
    createdAt: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class Stat(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    label: str = ""
    value: str = ""

class BeneficiaryStory(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = ""
    story: str = ""
    image: str = ""
    project: str = ""
    year: int = 2024

class PageContent(BaseModel):
    title: str = ""
    subtitle: str = ""

class Comment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    articleId: str = ""
    author: str = ""
    email: str = ""
    content: str = ""
    status: str = "pending"  # pending, approved, rejected
    createdAt: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class SiteSettings(BaseModel):
    id: str = "site_settings"
    siteName: str = "منظمة CMS"
    logo: str = ""
    favicon: str = ""
    primaryColor: str = "#3b82f6"
    secondaryColor: str = "#ef4444"
    defaultLanguage: str = "ar"
    enableComments: bool = True
    enableNewsletter: bool = True

class SiteContent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = "site_content"
    hero: HeroContent = HeroContent()
    about: AboutContent = AboutContent()
    services: List[Service] = []
    projects: List[Project] = []
    jobs: List[Job] = []
    team: List[TeamMember] = []
    departments: List[Department] = []
    articles: List[Article] = []
    categories: List[Category] = []
    tags: List[Tag] = []
    events: List[Event] = []
    pages: List[DynamicPage] = []
    navigation: List[NavigationLink] = []
    mediaLibrary: List[MediaItem] = []
    stats: Dict[str, Any] = {"visible": True, "items": []}
    donation: Dict[str, Any] = {"title": "", "description": "", "goal": 50000, "current": 0}
    contact: Dict[str, Any] = {}
    seo: Dict[str, str] = {"metaDescription": "", "metaKeywords": ""}
    aboutPage: PageContent = PageContent()
    beneficiariesPage: Dict[str, Any] = {"title": "", "subtitle": "", "stories": []}
    contactPage: PageContent = PageContent()
    projectsPage: PageContent = PageContent()
    teamPage: PageContent = PageContent()
    articlesPage: PageContent = PageContent()
    donatePage: PageContent = PageContent()
    jobsPage: PageContent = PageContent()
    servicesPage: PageContent = PageContent()
    successStoriesPage: PageContent = PageContent()

# ============ AUTH HELPERS ============

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await db.users.find_one({"id": user_id}, {"_id": 0})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def require_role(allowed_roles: List[str]):
    async def role_checker(user: dict = Depends(get_current_user)):
        if user.get("role") not in allowed_roles:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return user
    return role_checker

# ============ AUTH ROUTES ============

@api_router.post("/auth/register")
async def register(user_data: UserCreate):
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_dict = user_data.model_dump()
    user_dict["id"] = str(uuid.uuid4())
    user_dict["password"] = get_password_hash(user_data.password)
    user_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    
    # First user is admin
    count = await db.users.count_documents({})
    if count == 0:
        user_dict["role"] = "admin"
    
    await db.users.insert_one(user_dict)
    
    access_token = create_access_token({"sub": user_dict["id"]})
    user_response = {k: v for k, v in user_dict.items() if k != "password" and k != "_id"}
    return {"access_token": access_token, "token_type": "bearer", "user": user_response}

@api_router.post("/auth/login", response_model=Token)
async def login(login_data: LoginRequest):
    user = await db.users.find_one({"email": login_data.email}, {"_id": 0})
    if not user or not verify_password(login_data.password, user.get("password", "")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not user.get("is_active", True):
        raise HTTPException(status_code=403, detail="Account disabled")
    
    access_token = create_access_token({"sub": user["id"]})
    user_response = {k: v for k, v in user.items() if k != "password"}
    return Token(access_token=access_token, token_type="bearer", user=user_response)

@api_router.get("/auth/me")
async def get_me(user: dict = Depends(get_current_user)):
    return {k: v for k, v in user.items() if k != "password"}

# ============ USER MANAGEMENT ============

@api_router.get("/users", response_model=List[dict])
async def get_users(user: dict = Depends(require_role(["admin"]))):
    users = await db.users.find({}, {"_id": 0, "password": 0}).to_list(1000)
    return users

@api_router.post("/users", response_model=dict)
async def create_user(user_data: UserCreate, current_user: dict = Depends(require_role(["admin"]))):
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    user_dict = user_data.model_dump()
    user_dict["id"] = str(uuid.uuid4())
    user_dict["password"] = get_password_hash(user_data.password)
    user_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.users.insert_one(user_dict)
    return {k: v for k, v in user_dict.items() if k != "password"}

@api_router.put("/users/{user_id}", response_model=dict)
async def update_user(user_id: str, user_data: UserUpdate, current_user: dict = Depends(require_role(["admin"]))):
    update_dict = {k: v for k, v in user_data.model_dump().items() if v is not None}
    if "password" in update_dict:
        update_dict["password"] = get_password_hash(update_dict["password"])
    
    result = await db.users.update_one({"id": user_id}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    user = await db.users.find_one({"id": user_id}, {"_id": 0, "password": 0})
    return user

@api_router.delete("/users/{user_id}")
async def delete_user(user_id: str, current_user: dict = Depends(require_role(["admin"]))):
    if user_id == current_user["id"]:
        raise HTTPException(status_code=400, detail="Cannot delete yourself")
    result = await db.users.delete_one({"id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted"}

# ============ CONTENT ROUTES ============

@api_router.get("/content")
async def get_content():
    content = await db.site_content.find_one({"id": "site_content"}, {"_id": 0})
    if not content:
        return SiteContent().model_dump()
    return content

@api_router.put("/content")
async def update_content(content: dict, user: dict = Depends(require_role(["admin", "editor"]))):
    content["id"] = "site_content"
    await db.site_content.update_one(
        {"id": "site_content"},
        {"$set": content},
        upsert=True
    )
    return {"message": "Content updated"}

@api_router.put("/content/{section}")
async def update_content_section(section: str, data: dict, user: dict = Depends(require_role(["admin", "editor"]))):
    await db.site_content.update_one(
        {"id": "site_content"},
        {"$set": {section: data}},
        upsert=True
    )
    return {"message": f"{section} updated"}

# ============ COMMENTS ============

@api_router.get("/comments")
async def get_comments(user: dict = Depends(require_role(["admin", "editor"]))):
    comments = await db.comments.find({}, {"_id": 0}).to_list(1000)
    return comments

@api_router.get("/comments/article/{article_id}")
async def get_article_comments(article_id: str):
    comments = await db.comments.find(
        {"articleId": article_id, "status": "approved"},
        {"_id": 0}
    ).to_list(100)
    return comments

@api_router.post("/comments")
async def create_comment(comment: Comment):
    comment_dict = comment.model_dump()
    await db.comments.insert_one(comment_dict)
    return {"message": "Comment submitted for review"}

@api_router.put("/comments/{comment_id}/status")
async def update_comment_status(
    comment_id: str,
    status_data: dict,
    user: dict = Depends(require_role(["admin", "editor"]))
):
    await db.comments.update_one(
        {"id": comment_id},
        {"$set": {"status": status_data.get("status", "pending")}}
    )
    return {"message": "Comment status updated"}

@api_router.delete("/comments/{comment_id}")
async def delete_comment(comment_id: str, user: dict = Depends(require_role(["admin", "editor"]))):
    await db.comments.delete_one({"id": comment_id})
    return {"message": "Comment deleted"}

# ============ SETTINGS ============

@api_router.get("/settings")
async def get_settings():
    settings = await db.settings.find_one({"id": "site_settings"}, {"_id": 0})
    if not settings:
        return SiteSettings().model_dump()
    return settings

@api_router.put("/settings")
async def update_settings(settings: dict, user: dict = Depends(require_role(["admin"]))):
    settings["id"] = "site_settings"
    await db.settings.update_one(
        {"id": "site_settings"},
        {"$set": settings},
        upsert=True
    )
    return {"message": "Settings updated"}

# ============ NEWSLETTER ============

@api_router.post("/newsletter/subscribe")
async def subscribe_newsletter(data: dict):
    email = data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email required")
    
    existing = await db.newsletter.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Already subscribed")
    
    await db.newsletter.insert_one({
        "id": str(uuid.uuid4()),
        "email": email,
        "subscribed_at": datetime.now(timezone.utc).isoformat()
    })
    return {"message": "Subscribed successfully"}

@api_router.get("/newsletter/subscribers")
async def get_subscribers(user: dict = Depends(require_role(["admin"]))):
    subscribers = await db.newsletter.find({}, {"_id": 0}).to_list(10000)
    return subscribers

# ============ CONTACT MESSAGES ============

@api_router.post("/contact")
async def submit_contact(data: dict):
    message = {
        "id": str(uuid.uuid4()),
        "name": data.get("name", ""),
        "email": data.get("email", ""),
        "message": data.get("message", ""),
        "status": "unread",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.contact_messages.insert_one(message)
    return {"message": "Message sent successfully"}

@api_router.get("/contact/messages")
async def get_contact_messages(user: dict = Depends(require_role(["admin", "editor"]))):
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    return messages

@api_router.put("/contact/messages/{message_id}/read")
async def mark_message_read(message_id: str, user: dict = Depends(require_role(["admin", "editor"]))):
    await db.contact_messages.update_one({"id": message_id}, {"$set": {"status": "read"}})
    return {"message": "Marked as read"}

# ============ HISTORY ============

@api_router.get("/history")
async def get_history(user: dict = Depends(require_role(["admin"]))):
    history = await db.content_history.find({}, {"_id": 0}).sort("timestamp", -1).to_list(20)
    return history

@api_router.post("/history")
async def save_history(data: dict, user: dict = Depends(require_role(["admin", "editor"]))):
    history_entry = {
        "id": str(uuid.uuid4()),
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "content": data.get("content", {}),
        "user_id": user["id"],
        "user_name": user["name"]
    }
    await db.content_history.insert_one(history_entry)
    
    # Keep only last 20
    count = await db.content_history.count_documents({})
    if count > 20:
        oldest = await db.content_history.find().sort("timestamp", 1).limit(count - 20).to_list(count - 20)
        for old in oldest:
            await db.content_history.delete_one({"_id": old["_id"]})
    
    return {"message": "History saved"}

# ============ ANALYTICS (Mock) ============

@api_router.get("/analytics")
async def get_analytics(user: dict = Depends(require_role(["admin", "editor"]))):
    content = await db.site_content.find_one({"id": "site_content"}, {"_id": 0})
    if not content:
        content = SiteContent().model_dump()
    
    return {
        "visitors": {
            "total": 1362,
            "weekly": [150, 230, 224, 218, 135, 147, 260]
        },
        "traffic_sources": {
            "search": 55,
            "direct": 25,
            "social": 20
        },
        "content_stats": {
            "articles": len(content.get("articles", [])),
            "projects": len(content.get("projects", [])),
            "team_members": len(content.get("team", [])),
            "jobs": len(content.get("jobs", []))
        }
    }

# ============ SETUP ============

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
