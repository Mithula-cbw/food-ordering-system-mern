import React from 'react';

type NavigationProps = {
  children: React.ReactNode;
};

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  return (
    <nav>
      {children}
    </nav>
  );
};

export default Navigation;
