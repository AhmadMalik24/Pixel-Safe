import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Upload, BarChart3, Clock, ArrowRight } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    tamperedImages: 0,
    protectedImages: 0,
    analysesThisMonth: 0
  });
  
  // Mock recent analyses data
  const recentAnalyses = [
    {
      id: '1',
      fileName: 'beach_vacation.jpg',
      date: '2023-05-15',
      status: 'Clean',
      confidence: 95,
      thumbnail: 'https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      fileName: 'profile_photo.png',
      date: '2023-05-14',
      status: 'Suspicious',
      confidence: 68,
      thumbnail: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      fileName: 'product_image.jpg',
      date: '2023-05-12',
      status: 'Tampered',
      confidence: 92,
      thumbnail: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '4',
      fileName: 'landscape.jpg',
      date: '2023-05-10',
      status: 'Clean',
      confidence: 97,
      thumbnail: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];
  
  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setStats({
          totalAnalyses: 47,
          tamperedImages: 12,
          protectedImages: 23,
          analysesThisMonth: 18
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Helper to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Tampered':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">Tampered</span>;
      case 'Suspicious':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">Suspicious</span>;
      case 'Clean':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">Clean</span>;
      default:
        return null;
    }
  };
  
  if (loading) {
    return <LoadingSpinner fullScreen text="Loading dashboard..." />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title={`Welcome back, ${user?.name || 'User'}!`}
        description="Here's an overview of your image analysis activity"
        action={
          <Link to="/app/upload" className="btn-primary btn-md">
            <Upload size={16} className="mr-2" />
            Analyze New Image
          </Link>
        }
      />
      
      {/* Stats cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md bg-primary-100 p-3">
              <BarChart3 className="h-6 w-6 text-primary-600" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Analyses</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">{stats.totalAnalyses}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        
        <div className="card px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md bg-error-100 p-3">
              <Shield className="h-6 w-6 text-error-600" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Tampered Images</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">{stats.tamperedImages}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        
        <div className="card px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md bg-success-100 p-3">
              <Shield className="h-6 w-6 text-success-600" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Protected Images</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">{stats.protectedImages}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        
        <div className="card px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md bg-primary-100 p-3">
              <Clock className="h-6 w-6 text-primary-600" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">This Month</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">{stats.analysesThisMonth}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent analyses */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Analyses</h2>
          <Link to="/app/history" className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center">
            View all
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recentAnalyses.map((analysis) => (
            <div key={analysis.id} className="card overflow-hidden">
              <div className="h-36 bg-gray-200 relative">
                <img 
                  src={analysis.thumbnail} 
                  alt={analysis.fileName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  {getStatusBadge(analysis.status)}
                </div>
              </div>
              <div className="px-4 py-3">
                <h3 className="text-sm font-medium text-gray-900 truncate" title={analysis.fileName}>
                  {analysis.fileName}
                </h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">{analysis.date}</p>
                  <p className="text-xs font-medium text-gray-700">{analysis.confidence}% confidence</p>
                </div>
                <Link 
                  to={`/app/history?id=${analysis.id}`} 
                  className="mt-2 w-full btn-sm btn-outline flex items-center justify-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="card p-6 text-center sm:col-span-1">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <Upload className="h-6 w-6 text-primary-600" aria-hidden="true" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Upload Image</h3>
          <p className="mt-2 text-sm text-gray-500">
            Upload and analyze a new image to detect tampering or manipulation.
          </p>
          <div className="mt-4">
            <Link to="/app/upload" className="btn-primary btn-md w-full">
              Start Upload
            </Link>
          </div>
        </div>
        
        <div className="card p-6 text-center sm:col-span-1">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <Shield className="h-6 w-6 text-primary-600" aria-hidden="true" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Protect Image</h3>
          <p className="mt-2 text-sm text-gray-500">
            Add invisible watermarks to your images to protect them from tampering.
          </p>
          <div className="mt-4">
            <Link to="/app/upload?protect=true" className="btn-primary btn-md w-full">
              Protect Image
            </Link>
          </div>
        </div>
        
        <div className="card p-6 text-center sm:col-span-1">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <BarChart3 className="h-6 w-6 text-primary-600" aria-hidden="true" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">View Reports</h3>
          <p className="mt-2 text-sm text-gray-500">
            Access your historical analysis reports and download detailed results.
          </p>
          <div className="mt-4">
            <Link to="/app/history" className="btn-primary btn-md w-full">
              View Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;