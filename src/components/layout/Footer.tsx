import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Logo size={32} />
              <span className="text-xl font-bold text-primary-900">Pixel-Safe</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Advanced forensic image analysis for detecting tampering using AI, bit-level analysis, and watermarking.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Navigation links */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {['Features', 'How It Works', 'Pricing', 'Case Studies'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookies', 'Security'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {currentYear} Pixel-Safe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;