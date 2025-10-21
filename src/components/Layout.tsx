import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
   
      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>
         <hr className='bg-orange-600 py-1' />
      <Footer />
    </div>
  );
};

export default Layout;