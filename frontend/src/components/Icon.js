import React from 'react';
import * as LucideIcons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const Icons = LucideIcons;
  let Component = Icons[name];
  
  if (!Component) {
    Component = Icons.HelpCircle;
  }
  
  if (!Component) {
    return null;
  }
  
  try {
    return React.createElement(Component, props);
  } catch (error) {
    console.error(`Error rendering icon: ${name}`, error);
    return null;
  }
};

export default Icon;
