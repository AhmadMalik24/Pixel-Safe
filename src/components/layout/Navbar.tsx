import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Upload, History, Settings, LogOut, Shield, ChevronDown, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../common/Logo';

interface NavbarProps {
  type: 'public' | 'dashboard';
}

const Navbar = ({ type }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  // Dashboard navigation items
  const dashboardNavItems = [
    { path: '/app', label: 'Dashboard', icon: Shield },
    { path: '/app/upload', label: 'Upload', icon: Upload },
    { path: '/app/history', label: 'History', icon: History },
    { path: '/app/settings', label: 'Settings', icon: Settings },
  ];
  
  // Public navigation items
  const publicNavItems = [
    { path: '/#features', label: 'Features' },
    { path: '/#how-it-works', label: 'How It Works' },
    { path: '/#pricing', label: 'Pricing' },
  ];
  
  return (
    <header className={`sticky top-0 z-40 w-full border-b ${
      type === 'dashboard' 
        ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800' 
        : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={isAuthenticated ? '/app' : '/'} className="flex items-center space-x-2">
              <Logo size={32} />
              <span className="text-xl font-bold text-primary-900 dark:text-primary-100">Pixel-Safe</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {type === 'dashboard' ? (
              // Dashboard nav items
              <>
                {dashboardNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon size={18} className="mr-2" />
                    {item.label}
                  </Link>
                ))}
                
                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                
                {/* User dropdown - simplified for this implementation */}
                <div className="relative ml-4">
                  <button
                    className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="hidden lg:inline-block">{user?.name || 'User'}</span>
                    <ChevronDown size={16} />
                  </button>
                  
                  {/* Logout button */}
                  <button
                    onClick={handleLogout}
                    className="ml-2 flex items-center px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              // Public nav items
              <>
                {publicNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/app"
                      className="btn-primary btn-md ml-4"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn-outline btn-md ml-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="btn-outline btn-md ml-4"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn-primary btn-md ml-2"
                    >
                      Register
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button
              type="button"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            {type === 'dashboard' ? (
              // Dashboard mobile nav
              <>
                {dashboardNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-base rounded-md ${
                      isActive(item.path)
                        ? 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon size={20} className="mr-3" />
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 text-base text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                >
                  <LogOut size={20} className="mr-3" />
                  Logout
                </button>
              </>
            ) : (
              // Public mobile nav
              <>
                {publicNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/app"
                        className="block w-full text-center btn-primary btn-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="mt-2 block w-full text-center btn-outline btn-md"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block w-full text-center btn-outline btn-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="mt-2 block w-full text-center btn-primary btn-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;