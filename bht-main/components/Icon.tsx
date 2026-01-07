
import React from 'react';
import * as LucideIcons from 'lucide-react';

export const Icon = (props: { name: string; [key: string]: any }) => {
  const { name, ...otherProps } = props;
  
  // الوصول الآمن لمجموعة الأيقونات مع مراعاة اختلاف طرق التصدير في ESM
  const Icons = LucideIcons as any;
  
  // محاولة جلب المكون من التصدير المسمى أو التصدير الافتراضي
  let Component = Icons[name] || Icons.default?.[name];

  // في حال لم يتم العثور على الأيقونة، نستخدم أيقونة افتراضية (HelpCircle)
  if (!Component) {
    Component = Icons.HelpCircle || Icons.default?.HelpCircle;
  }

  // إذا لم نجد حتى الأيقونة الافتراضية، لا نعرض شيئاً لتجنب الانهيار
  if (!Component) {
    return null;
  }

  // استخدام React.createElement لضمان التوافق مع الأنواع المعقدة (مثل ForwardRef)
  try {
    return React.createElement(Component, otherProps);
  } catch (error) {
    console.error(`Error rendering icon: ${name}`, error);
    return null;
  }
};

export default Icon;
