import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from './Toaster';

interface LayoutProps {
  type: 'public' | 'dashboard';
}

const Layout = ({ type }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar type={type} />
      
      <main className={`flex-1 ${type === 'dashboard' ? 'bg-gray-50' : 'bg-white'}`}>
        <Outlet />
      </main>
      
      {type === 'public' && <Footer />}
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Layout;