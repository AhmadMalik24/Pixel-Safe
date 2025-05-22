import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/common/Logo';

const NotFound = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo size={48} animated />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary-900">
          404 - Page Not Found
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <p className="mb-6 text-gray-700">
            Sorry, we couldn't find the page you were looking for. Let's get you back on track.
          </p>
          
          <div className="flex flex-col space-y-4">
            <Link
              to={isAuthenticated ? '/app' : '/'}
              className="btn-primary btn-lg w-full"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Go to Homepage'}
            </Link>
            
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="btn-outline btn-lg w-full"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-outline btn-lg w-full"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;