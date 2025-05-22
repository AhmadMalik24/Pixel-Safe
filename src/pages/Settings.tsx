import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Bell, Clock, Key, LogOut, Mail, User } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { useAuth } from '../context/AuthContext';
import { toast } from '../components/layout/Toaster';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userSettings, setUserSettings] = useState({
    name: user?.name || '',
    email: user?.email || '',
    notifications: {
      email: true,
      browser: true,
      tamperedAlerts: true,
    },
    privacy: {
      saveAnalysisHistory: true,
      anonymizeUploads: false,
    },
    defaultProtection: {
      autoProtect: true,
      watermarkStrength: 'medium',
    }
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [saveLoading, setSaveLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserSettings({
      ...userSettings,
      [name]: value,
    });
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };
  
  const handleCheckboxChange = (category: string, setting: string) => {
    setUserSettings({
      ...userSettings,
      [category]: {
        ...userSettings[category as keyof typeof userSettings] as Record<string, boolean>,
        [setting]: !(userSettings[category as keyof typeof userSettings] as Record<string, boolean>)[setting],
      },
    });
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const [category, setting] = name.split('.');
    
    setUserSettings({
      ...userSettings,
      [category]: {
        ...(userSettings[category as keyof typeof userSettings] as Record<string, string>),
        [setting]: value,
      },
    });
  };
  
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile settings saved successfully.');
    } catch (error) {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };
  
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    
    setSaveLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      toast.success('Password changed successfully.');
    } catch (error) {
      toast.error('Failed to change password. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
    toast.info('You have been logged out.');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Account Settings"
        description="Manage your profile, security, and preferences"
      />
      
      <div className="mt-6 max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">Select a tab</label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option>Profile</option>
              <option>Security</option>
              <option>Notifications</option>
              <option>Privacy</option>
              <option>Protection</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                {[
                  { name: 'Profile', icon: User, current: true },
                  { name: 'Security', icon: Key, current: false },
                  { name: 'Notifications', icon: Bell, current: false },
                  { name: 'Privacy', icon: Shield, current: false },
                  { name: 'Protection', icon: Shield, current: false },
                ].map((tab) => (
                  <a
                    key={tab.name}
                    href="#"
                    className={`
                      ${tab.current
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                    `}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Profile Settings */}
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSaveProfile}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your account information and how we can reach you.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="label">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={userSettings.name}
                      onChange={handleInputChange}
                      className="input mt-1"
                    />
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="label">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={userSettings.email}
                      onChange={handleInputChange}
                      className="input mt-1"
                    />
                  </div>
                  
                  <div className="sm:col-span-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mt-6">Notification Settings</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage how we contact you about analysis results and security alerts.
                    </p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="notifications.email"
                            name="notifications.email"
                            type="checkbox"
                            checked={userSettings.notifications.email}
                            onChange={() => handleCheckboxChange('notifications', 'email')}
                            className="h-4 w-4 text-primary-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="notifications.email" className="font-medium text-gray-700">
                            Email notifications
                          </label>
                          <p className="text-gray-500">Receive email notifications about your analysis results.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="notifications.browser"
                            name="notifications.browser"
                            type="checkbox"
                            checked={userSettings.notifications.browser}
                            onChange={() => handleCheckboxChange('notifications', 'browser')}
                            className="h-4 w-4 text-primary-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="notifications.browser" className="font-medium text-gray-700">
                            Browser notifications
                          </label>
                          <p className="text-gray-500">Receive browser notifications when analyses are complete.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="notifications.tamperedAlerts"
                            name="notifications.tamperedAlerts"
                            type="checkbox"
                            checked={userSettings.notifications.tamperedAlerts}
                            onChange={() => handleCheckboxChange('notifications', 'tamperedAlerts')}
                            className="h-4 w-4 text-primary-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="notifications.tamperedAlerts" className="font-medium text-gray-700">
                            Tampered image alerts
                          </label>
                          <p className="text-gray-500">Receive immediate alerts when tampered images are detected.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mt-6">Privacy Settings</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Control how your data is stored and managed.
                    </p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="privacy.saveAnalysisHistory"
                            name="privacy.saveAnalysisHistory"
                            type="checkbox"
                            checked={userSettings.privacy.saveAnalysisHistory}
                            onChange={() => handleCheckboxChange('privacy', 'saveAnalysisHistory')}
                            className="h-4 w-4 text-primary-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="privacy.saveAnalysisHistory" className="font-medium text-gray-700">
                            Save analysis history
                          </label>
                          <p className="text-gray-500">Store results of your image analyses for future reference.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="privacy.anonymizeUploads"
                            name="privacy.anonymizeUploads"
                            type="checkbox"
                            checked={userSettings.privacy.anonymizeUploads}
                            onChange={() => handleCheckboxChange('privacy', 'anonymizeUploads')}
                            className="h-4 w-4 text-primary-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="privacy.anonymizeUploads" className="font-medium text-gray-700">
                            Anonymize uploaded images
                          </label>
                          <p className="text-gray-500">Remove metadata from images before analysis.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mt-6">Protection Settings</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage your default settings for image protection.
                    </p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="defaultProtection.autoProtect"
                            name="defaultProtection.autoProtect"
                            type="checkbox"
                            checked={userSettings.defaultProtection.autoProtect}
                            onChange={() => handleCheckboxChange('defaultProtection', 'autoProtect')}
                            className="h-4 w-4 text-primary-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="defaultProtection.autoProtect" className="font-medium text-gray-700">
                            Auto-protect images
                          </label>
                          <p className="text-gray-500">Automatically apply watermark protection to uploaded images.</p>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="defaultProtection.watermarkStrength" className="label">
                          Default watermark strength
                        </label>
                        <select
                          id="defaultProtection.watermarkStrength"
                          name="defaultProtection.watermarkStrength"
                          value={userSettings.defaultProtection.watermarkStrength}
                          onChange={handleSelectChange}
                          className="input mt-1"
                        >
                          <option value="light">Light - Less visible, moderate protection</option>
                          <option value="medium">Medium - Balanced visibility and protection</option>
                          <option value="strong">Strong - Maximum protection, slightly visible</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  className="btn-outline btn-md mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary btn-md"
                  disabled={saveLoading}
                >
                  {saveLoading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </form>
            
            {/* Password Change Section */}
            <div className="mt-10 pt-10 border-t border-gray-200">
              <form onSubmit={handleChangePassword}>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Change Password</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your password to keep your account secure.
                  </p>
                </div>
                
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="currentPassword" className="label">
                      Current password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="input mt-1"
                      required
                    />
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="newPassword" className="label">
                      New password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="input mt-1"
                      required
                      minLength={8}
                    />
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="confirmPassword" className="label">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="input mt-1"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary btn-md"
                    disabled={saveLoading}
                  >
                    {saveLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Account Actions */}
            <div className="mt-10 pt-10 border-t border-gray-200">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Account Actions</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your account and session.
                </p>
              </div>
              
              <div className="mt-6 space-y-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-outline btn-md text-error-700 border-error-300 hover:bg-error-50 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
                
                <button
                  type="button"
                  className="btn-outline btn-md text-error-700 border-error-300 hover:bg-error-50"
                >
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;