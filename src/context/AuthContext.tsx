import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('pixelSafeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Mock API call - in real app, this would be a fetch to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const userData = {
        id: '123456',
        email,
        name: email.split('@')[0], // Just for demo
      };
      
      localStorage.setItem('pixelSafeUser', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const userData = {
        id: '123456',
        email,
        name,
      };
      
      localStorage.setItem('pixelSafeUser', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('pixelSafeUser');
    setUser(null);
  };
  
  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Success would be handled by sending reset email
    } catch (error) {
      console.error('Forgot password error:', error);
      throw new Error('Password reset request failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};