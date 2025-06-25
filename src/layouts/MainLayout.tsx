import React from 'react';
import Header from '../components/Header/Header';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <main className="flex-1 w-full flex justify-center items-start p-4">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
