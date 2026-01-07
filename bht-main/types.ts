export interface PageContent {
  title: string;
  subtitle: string;
}

export interface DynamicPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  isHomepage: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  };
}

export interface NavigationLink {
    id: string;
    label: string;
    path: string;
}

export interface MediaItem {
  id: string;
  name: string;
  type: string;
  size: number;
  base64: string;
  createdAt: string;
}

export interface BeneficiaryStory {
  id: string;
  name: string;
  story: string;
  image: string;
  project: string; // e.g., 'Training', 'Farming'
  year: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'latest' | 'success_story';
  gallery?: string[];
  status: 'ongoing' | 'completed';
}

export interface Job {
  id:string;
  title: string;
  description: string;
  skills: string;
  location: string;
  type: string; // Full-time, Part-time
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  image: string;
  bio: string;
  skills: string[];
  experienceYears: number;
  certifications: string[];
  achievements: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  }
}

export interface Department {
  id: string;
  name: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
}

export interface Service {
  id: string;
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string; // ISO 8601 format
  categoryId: string;
  tagIds: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO 8601 format
  location: string;
}

export interface HistoryEntry {
  timestamp: string;
  content: SiteContent;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    image: string;
    cta_text: string;
    cta_link: string;
  };
  about: {
    title: string;
    intro: string;
    description: string;
    image: string;
    vision: string;
    mission: string;
  };
  services: Service[];
  projects: Project[];
  jobs: Job[];
  team: TeamMember[];
  departments: Department[];
  articles: Article[];
  categories: Category[];
  tags: Tag[];
  events: Event[];
  pages: DynamicPage[];
  navigation: NavigationLink[];
  mediaLibrary: MediaItem[];
  stats: {
    visible: boolean;
    items: Stat[];
  };
  donation: {
    title: string;
    description: string;
    goal: number;
    current: number;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    facebook: string;
    website: string;
    lat: number;
    lng: number;
  };
  seo: {
    metaDescription: string;
    metaKeywords: string;
  };
  aboutPage: PageContent;
  beneficiariesPage: PageContent & { stories: BeneficiaryStory[] };
  contactPage: PageContent;
  projectsPage: PageContent;
  teamPage: PageContent;
  articlesPage: PageContent;
  donatePage: PageContent;
  jobsPage: PageContent;
  servicesPage: PageContent;
  successStoriesPage: PageContent;
}

export const INITIAL_CONTENT: SiteContent = {
  hero: {
    title: "منظمة إنسانية: نصنع الأمل، نبني المستقبل",
    subtitle: "نحن منظمة تنمية مجتمعية في شمال شرق سوريا، نُمكّن المجتمعات المحلية بالأدوات والمعرفة لبناء مستقبل مستدام ومستقل.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    cta_text: "شاهد تأثيرنا",
    cta_link: "#about"
  },
  about: {
    title: "عن منظمة أمل أفضل الطبقة (BHT)",
    intro: "في قلب مدينة الطبقة، حيث الحاجة تلتقي بالإصرار، ولدت فكرة منظمة إنسانية تهدف لصناعة أمل أفضل. بدأت رحلتنا في عام 2017 بمجموعة من الشباب الذين آمنوا بقدرة مجتمعهم على النهوض.",
    description: "تأسست منظمتنا الإنسانية بتاريخ 2017/6/6 على يد مجموعة من شباب مدينة الطبقة العاملين في المجال الإنساني والمهتمين بالشأن المدني بهدف تحسين الواقع الاقتصادي وتنمية قطاع الخدمات الأساسية. نسعى ان نكون أصحاب دور فعال ومكانة متميزة في مجال التنمية المجتمعية على مستوى شمال شرق سوريا. على مدى 7 سنوات، وبفضل دعمكم، أثرنا في حياة أكثر من 15,000 شخص عبر 45 مشروعًا مكتملًا في مجالات التعليم وسبل العيش وبناء السلام.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    vision: "أن نكون أصحاب دور فعال ومكانة متميزة في مجال التنمية المجتمعية على مستوى شمال شرق سوريا.",
    mission: "تحسين الواقع الاقتصادي وتنمية قطاع الخدمات الأساسية وتمكين المجتمعات المحلية بالأدوات والمعرفة لبناء مستقبل مستدام ومستقل."
  },
  services: [
    { id: "1", icon: "BookOpen", title: "التعليم ودعم الأطفال", description: "نفتح أبواب المستقبل للأطفال المهمشين في سوريا. كل طفل يستحق فرصة للتعلم، وبرامجنا التعليمية تمنحهم الأدوات اللازمة لبناء غدٍ أفضل." },
    { id: "2", icon: "Briefcase", title: "سبل العيش وتمكين الشباب", description: "نحوّل الأفكار إلى مشاريع ناجحة. نستثمر في رواد الأعمال المحليين بالتدريب والتوجيه لتحقيق استقلالهم المادي ودعم الاقتصاد المحلي في الطبقة والمناطق المجاورة." },
    { id: "3", icon: "HeartHandshake", title: "بناء السلام المجتمعي", description: "نزرع بذور السلام في مجتمعنا. من خلال جلسات الحوار ومبادرات المناصرة، نعمل على حل النزاعات وتعزيز التماسك الاجتماعي لمستقبل أكثر استقرارًا في سوريا." }
  ],
  projects: [
    {
      id: "1",
      title: "مشروع التدريب المهني للشباب في الطبقة",
      description: "تمكين الشباب والشابات من اكتساب مهارات عملية في مجالات الخياطة والحلاقة وصيانة الهواتف. يهدف المشروع إلى تزويد 150 شابًا وشابة بالمهارات اللازمة لدخول سوق العمل وتحقيق استقلالهم المادي.",
      image: "https://images.unsplash.com/photo-1581092921461-eab6245b0262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'latest',
      status: 'completed',
      gallery: [
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
      ]
    },
    {
      id: "2",
      title: "دعم المزارعين في ريف الرقة",
      description: "توزيع البذور والأسمدة على المزارعين المتضررين لإعادة إحياء الأراضي الزراعية. استفاد من المشروع أكثر من 300 مزارع، مما ساهم في زيادة الإنتاج المحلي وتحسين الأمن الغذائي في المنطقة.",
      image: "https://images.unsplash.com/photo-1625246333195-551e5088921b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'success_story',
      status: 'ongoing',
       gallery: ["https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"]
    },
    { id: "3", title: "إعادة تأهيل المدارس", description: "ترميم 10 مدارس في ريف الطبقة لتوفير بيئة تعليمية آمنة للأطفال. شملت الأعمال إصلاح الفصول الدراسية، وتوفير مقاعد جديدة، وإعادة تأهيل المرافق الصحية.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: 'success_story', status: 'completed', gallery: ["https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"] },
    { id: "4", title: "حملات توعية صحية مجتمعية", description: "تنظيم ورش عمل وجلسات توعية حول النظافة الشخصية والوقاية من الأمراض. وصلت الحملات إلى أكثر من 5000 فرد من أفراد المجتمع المحلي.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: 'latest', status: 'ongoing' }
  ],
  jobs: [
    { id: "1", title: "منسق مشاريع ميداني", description: "مسؤول عن متابعة تنفيذ أنشطة المشروع في الميدان ورفع التقارير الدورية.", skills: "خبرة 3 سنوات، إجادة اللغة الإنجليزية، مهارات تواصل ممتازة", location: "الطبقة", type: "دوام كامل" },
    { id: "2", title: "موظف مراقبة وتقييم", description: "جمع البيانات وتحليلها لضمان جودة تنفيذ المشاريع وتحقيق المؤشرات.", skills: "خبرة في أدوات الجمع (Kobo)، تحليل البيانات (Excel)", location: "الرقة", type: "دوام جزئي" },
    { id: "3", title: "محاسب", description: "إدارة السجلات المالية وإعداد التقارير المالية الشهرية.", skills: "شهادة جامعية في المحاسبة، خبرة سنتين", location: "الطبقة", type: "دوام كامل" },
    { id: "4", title: "عامل خدمات لوجستية", description: "مسؤول عن المشتريات والنقل والتخزين.", skills: "خبرة في إدارة سلاسل الإمداد", location: "دير الزور", type: "دوام كامل" }
  ],
  departments: [
    { id: "dept_1", name: "الإدارة العليا" },
    { id: "dept_2", name: "إدارة البرامج" },
    { id: "dept_3", name: "القسم المالي" },
    { id: "dept_4", name: "القسم التقني" }
  ],
  team: [
    { 
      id: "1", 
      name: "أحمد العلي", 
      role: "المدير التنفيذي", 
      departmentId: "dept_1",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      bio: "أحمد هو قائد ذو رؤية مع أكثر من 10 سنوات من الخبرة في قطاع المنظمات غير الحكومية. متخصص في التخطيط الاستراتيجي وتنمية الموارد.", 
      skills: ["التخطيط الاستراتيجي", "القيادة", "تطوير المؤسسات"],
      experienceYears: 12,
      certifications: ["MBA in Nonprofit Management", "PMP"],
      achievements: ["توسيع نطاق عمل المؤسسة لتشمل 3 محافظات", "تأمين شراكات دولية مع 5 منظمات أممية"],
      social: { linkedin: "#", twitter: "#", email: "ahmad.ali@bht-sy.org"} 
    },
    { 
      id: "2", 
      name: "سارة محمد", 
      role: "مديرة البرامج", 
      departmentId: "dept_2",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      bio: "سارة شغوفة بإحداث تأثير إيجابي. تدير حافظة مشاريعنا التعليمية وسبل العيش، مع التركيز على الابتكار والاستدامة.", 
      skills: ["إدارة المشاريع", "تصميم البرامج التدريبية", "المراقبة والتقييم"],
      experienceYears: 8,
      certifications: ["PMD Pro", "Monitoring & Evaluation Specialist"],
      achievements: ["إطلاق مشروع 'شباب الطبقة' الذي استهدف 500 مستفيد", "رقمنة نظام تقارير المشاريع"],
      social: { linkedin: "#", email: "sara.mohamed@bht-sy.org" } 
    }
  ],
  categories: [
    { id: 'cat1', name: 'أخبار المؤسسة' },
    { id: 'cat2', name: 'تقارير المشاريع' },
    { id: 'cat3', name: 'قصص نجاح' },
  ],
  tags: [
    { id: 'tag1', name: 'تعليم' },
    { id: 'tag2', name: 'تنمية مستدامة' },
    { id: 'tag3', name: 'شباب' },
    { id: 'tag4', name: 'زراعة' },
  ],
  articles: [
    { id: '1', title: 'مبادرة جديدة لدعم التعليم في المناطق النائية', content: 'أطلقت مؤسستنا مبادرة شاملة تهدف إلى تحسين جودة التعليم في القرى النائية من خلال توفير المواد التعليمية وتدريب المعلمين. تستهدف المبادرة الوصول إلى 5000 طفل خلال العام الأول.', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', date: '2024-05-20T10:00:00Z', categoryId: 'cat1', tagIds: ['tag1', 'tag3'] },
    { id: '2', title: 'حصاد ناجح: مشروع دعم المزارعين يحقق أهدافه', content: 'اختتم مشروع دعم المزارعين موسمه الأول بنجاح باهر، حيث تجاوزت معدلات الإنتاج التوقعات بنسبة 20%. يعكس هذا النجاح أهمية توفير الدعم التقني والموارد للمجتمعات الزراعية.', image: 'https://images.unsplash.com/photo-1563514227-920875701464?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', date: '2024-04-15T14:30:00Z', categoryId: 'cat2', tagIds: ['tag2', 'tag4'] },
  ],
  events: [
    { id: '1', title: 'ورشة عمل حول ريادة الأعمال للشباب', description: 'انضموا إلينا في ورشة عمل تفاعلية لتعلم أساسيات بدء المشاريع الصغيرة وإدارتها.', date: '2024-06-25T09:00:00Z', location: 'مركز التدريب المجتمعي، الطبقة'},
    { id: '2', title: 'اليوم المفتوح للتوعية الصحية', description: 'فعالية مجتمعية تتضمن فحوصات طبية مجانية، محاضرات توعوية، وأنشطة ترفيهية للأطفال.', date: '2024-07-10T11:00:00Z', location: 'الحديقة العامة، الرقة'},
  ],
  pages: [],
  navigation: [
      { id: 'nav1', label: 'الرئيسية', path: '/' },
      { id: 'nav2', label: 'من نحن', path: '/about' },
      { id: 'nav3', label: 'المشاريع', path: '/projects' },
      { id: 'nav4', label: 'الوظائف', path: '/jobs' },
      { id: 'nav5', label: 'الخدمات', path: '/services' },
      { id: 'nav6', label: 'قصص النجاح', path: '/success-stories' },
      { id: 'nav7', label: 'المستفيدين', path: '/beneficiaries' },
      { id: 'nav8', label: 'فريق العمل', path: '/team' },
      { id: 'nav_news', label: 'الأخبار', path: '/articles'},
      { id: 'nav9', label: 'اتصل بنا', path: '/contact' },
  ],
  mediaLibrary: [],
  stats: {
    visible: true,
    items: [
      { id: "1", label: "مستفيد", value: "15,000+" }, { id: "2", label: "مشروع مكتمل", value: "45" }, { id: "3", label: "شريك وداعم", value: "12" }, { id: "4", label: "سنة خبرة", value: "7" }
    ]
  },
  donation: {
    title: "مساهمتك تُعيد الأمل",
    description: "كل مساهمة، مهما كانت بسيطة، هي استثمار مباشر في مستقبل مجتمعاتنا. تبرعك اليوم يمكن أن يوفر كتابًا لطفل، أو يدعم تدريبًا لشاب، أو يساعد في بناء جسور الحوار والسلام. كن جزءًا من هذا الأثر.",
    goal: 50000,
    current: 32500,
  },
  contact: {
    email: "info@bht-sy.org",
    phone: "+963 900 000 000",
    address: "سوريا - الطبقة - الحي الأول",
    facebook: "facebook.com/bht",
    website: "www.bht-sy.org",
    lat: 35.8345,
    lng: 38.5444
  },
  seo: {
    metaDescription: "منظمة أمل أفضل للطبقة (BHT) هي منظمة إنسانية غير ربحية تهدف لتمكين المجتمعات عبر برامج التعليم، سبل العيش، وبناء السلام في شمال شرق سوريا. تبرع الآن.",
    metaKeywords: "منظمة إنسانية, تنمية مجتمعية, دعم سوريا, التعليم في سوريا, تمكين الشباب, منظمة غير ربحية, شمال شرق سوريا, الطبقة, الرقة, دير الزور, بناء السلام"
  },
  aboutPage: { title: "من نحن | منظمة أمل أفضل الطبقة", subtitle: "تعرف على قصتنا، رؤيتنا، ورسالتنا في تمكين المجتمعات المحلية في شمال شرق سوريا." },
  beneficiariesPage: {
    title: "قصص المستفيدين | منظمة أمل أفضل الطبقة",
    subtitle: "شاهد الأثر الحقيقي لبرامجنا التنموية في سوريا من خلال قصص نجاح ملهمة من المستفيدين مباشرة.",
    stories: [
        { id: '1', name: 'عائشة', story: 'بفضل التدريب المهني في الخياطة، تمكنت من بدء مشروعي الصغير وإعالة أسرتي. لقد أعطتني المؤسسة الأدوات والأمل.', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', project: 'Training', year: 2023 },
        { id: '2', name: 'علي', story: 'بعد أن فقدت محصولي، كدت أن أفقد الأمل. دعم البذور والأسمدة ساعدني على الوقوف على قدمي مرة أخرى وزراعة أرضي بنجاح.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', project: 'Farming', year: 2022 }
    ]
  },
  contactPage: { title: "اتصل بنا | منظمة إنسانية في سوريا", subtitle: "تواصل مع منظمة أمل أفضل الطبقة للاستفسارات، الشراكات، أو فرص التطوع. نحن هنا للمساعدة." },
  projectsPage: { title: "مشاريعنا التنموية | دعم التعليم وسبل العيش", subtitle: "استكشف مشاريعنا في التعليم، سبل العيش، وبناء السلام التي تهدف إلى إحداث تغيير حقيقي ومستدام في شمال شرق سوريا." },
  teamPage: { title: "فريقنا | خبراء التنمية المجتمعية", subtitle: "تعرف على العقول والقلوب التي تقود التغيير في منظمتنا. فريقنا هو قوة دافعة من الخبراء المحليين الملتزمين بتحقيق رؤيتنا على أرض الواقع." },
  articlesPage: { title: "أخبار ومقالات عن التنمية في سوريا", subtitle: "تابع آخر أخبار مبادراتنا التنموية وقصص التأثير التي نصنعها في مجتمعات الطبقة، الرقة، ودير الزور."},
  donatePage: { title: "تبرع الآن لدعم مشاريعنا في سوريا", subtitle: "انضم إلينا في رحلتنا لإعادة بناء الأمل. تبرعك يساهم مباشرة في برامجنا التعليمية، ودعم سبل العيش، ومبادرات بناء السلام." },
  jobsPage: { title: "الوظائف الشاغرة | انضم لفريقنا", subtitle: "اكتشف الفرص المتاحة وكن جزءاً من التغيير الإيجابي في مجتمعنا." },
  servicesPage: { title: "خدماتنا | برامج التنمية المجتمعية", subtitle: "نقدم مجموعة من البرامج المصممة لتمكين الأفراد وبناء مستقبل مستدام." },
  successStoriesPage: { title: "قصص النجاح | أثر مشاريعنا", subtitle: "شاهد كيف تساهم مشاريعنا في تغيير حياة الناس نحو الأفضل." }
};