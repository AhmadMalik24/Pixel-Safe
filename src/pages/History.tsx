import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import HistoryTable, { HistoryItem } from '../components/history/HistoryTable';
import ResultViewer from '../components/results/ResultViewer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { toast } from '../components/layout/Toaster';

const History = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    showTampered: true,
    showClean: true,
    showProtected: true,
    showUnprotected: true,
  });
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  
  useEffect(() => {
    // Check if there's an ID in the URL params to show detail view
    const idParam = searchParams.get('id');
    
    // Simulate fetching history data
    const fetchHistoryData = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockItems: HistoryItem[] = [
          {
            id: '1',
            fileName: 'vacation_beach.jpg',
            thumbnailUrl: 'https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=150',
            analysisDate: new Date(2023, 4, 15),
            confidence: 12,
            tamperedRegions: 0,
            protected: true,
            reportUrl: '#',
          },
          {
            id: '2',
            fileName: 'profile_photo.png',
            thumbnailUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
            analysisDate: new Date(2023, 4, 14),
            confidence: 68,
            tamperedRegions: 2,
            protected: false,
            reportUrl: '#',
          },
          {
            id: '3',
            fileName: 'product_image.jpg',
            thumbnailUrl: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=150',
            analysisDate: new Date(2023, 4, 12),
            confidence: 92,
            tamperedRegions: 3,
            protected: false,
            reportUrl: '#',
          },
          {
            id: '4',
            fileName: 'family_photo.jpg',
            thumbnailUrl: 'https://images.pexels.com/photos/1683975/pexels-photo-1683975.jpeg?auto=compress&cs=tinysrgb&w=150',
            analysisDate: new Date(2023, 4, 10),
            confidence: 5,
            tamperedRegions: 0,
            protected: true,
            reportUrl: '#',
          },
          {
            id: '5',
            fileName: 'sunset_landscape.jpg',
            thumbnailUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=150',
            analysisDate: new Date(2023, 4, 8),
            confidence: 18,
            tamperedRegions: 0,
            protected: false,
            reportUrl: '#',
          },
          {
            id: '6',
            fileName: 'company_logo.png',
            thumbnailUrl: 'https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=150',
            analysisDate: new Date(2023, 4, 5),
            confidence: 2,
            tamperedRegions: 0,
            protected: true,
            reportUrl: '#',
          },
          {
            id: '7',
            fileName: 'conference_photo.jpg',
            thumbnailUrl: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=150',
            analysisDate: new Date(2023, 4, 1),
            confidence: 87,
            tamperedRegions: 1,
            protected: false,
            reportUrl: '#',
          },
        ];
        
        setItems(mockItems);
        setFilteredItems(mockItems);
        
        // If there's an ID in URL params, find that item
        if (idParam) {
          const foundItem = mockItems.find(item => item.id === idParam);
          if (foundItem) {
            setSelectedItem(foundItem);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching history data:', error);
        toast.error('Failed to load history. Please try again.');
        setLoading(false);
      }
    };
    
    fetchHistoryData();
  }, [searchParams]);
  
  // Filter items when search term or filter options change
  useEffect(() => {
    const filtered = items.filter(item => {
      // Filter by search term
      const matchesSearch = item.fileName.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by tampered status
      const isTampered = item.confidence >= 50;
      const matchesTamperedFilter = 
        (isTampered && filterOptions.showTampered) || 
        (!isTampered && filterOptions.showClean);
      
      // Filter by protection status
      const matchesProtectionFilter = 
        (item.protected && filterOptions.showProtected) || 
        (!item.protected && filterOptions.showUnprotected);
      
      return matchesSearch && matchesTamperedFilter && matchesProtectionFilter;
    });
    
    setFilteredItems(filtered);
  }, [items, searchTerm, filterOptions]);
  
  const handleViewDetails = (item: HistoryItem) => {
    setSelectedItem(item);
    // Update URL with selected item ID
    setSearchParams({ id: item.id });
  };
  
  const handleDelete = (id: string) => {
    // In a real app, this would call an API to delete the item
    setItems(items.filter(item => item.id !== id));
    setFilteredItems(filteredItems.filter(item => item.id !== id));
    
    // If the deleted item was selected, clear selection
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(null);
      setSearchParams({});
    }
  };
  
  const handleCloseDetails = () => {
    setSelectedItem(null);
    setSearchParams({});
  };
  
  const handleFilterChange = (key: keyof typeof filterOptions) => {
    setFilterOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setFilterOptions({
      showTampered: true,
      showClean: true,
      showProtected: true,
      showUnprotected: true,
    });
  };
  
  // Check if any filters are active
  const hasActiveFilters = 
    !filterOptions.showTampered || 
    !filterOptions.showClean || 
    !filterOptions.showProtected || 
    !filterOptions.showUnprotected ||
    searchTerm !== '';
  
  if (loading) {
    return <LoadingSpinner fullScreen text="Loading history..." />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Analysis History"
        description="View and manage your past image analysis results"
      />
      
      {selectedItem ? (
        // Detail view
        <div className="mt-6 max-w-4xl mx-auto">
          <div className="mb-4">
            <button
              onClick={handleCloseDetails}
              className="btn-outline btn-sm"
            >
              ← Back to History
            </button>
          </div>
          
          <ResultViewer
            image={{
              url: selectedItem.thumbnailUrl,
              name: selectedItem.fileName,
            }}
            result={{
              heatmapUrl: 'https://images.pexels.com/photos/3224171/pexels-photo-3224171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              confidence: selectedItem.confidence,
              tamperedRegions: selectedItem.tamperedRegions,
              analysisDate: selectedItem.analysisDate,
              metadata: [
                { label: 'File Name', value: selectedItem.fileName },
                { label: 'Analysis Date', value: selectedItem.analysisDate.toLocaleString() },
                { label: 'Protection Status', value: selectedItem.protected ? 'Watermarked' : 'Not Protected' },
                { label: 'File Type', value: selectedItem.fileName.split('.').pop()?.toUpperCase() || 'Unknown' },
                { label: 'Analysis Method', value: 'AI + Bit-level' },
              ],
            }}
          />
        </div>
      ) : (
        // List view
        <div className="mt-6">
          {/* Search and filters */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by filename"
                  className="input pl-10 w-full"
                />
              </div>
              
              <div className="relative">
                <button
                  className="btn-outline btn-md flex items-center"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </button>
                
                {/* Filter dropdown */}
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Filters</h3>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="text-xs text-primary-600 hover:text-primary-800 flex items-center"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Clear all
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-3 mt-3">
                      <h4 className="text-xs uppercase font-medium text-gray-500">Status</h4>
                      <div className="flex items-center">
                        <input
                          id="filter-tampered"
                          type="checkbox"
                          checked={filterOptions.showTampered}
                          onChange={() => handleFilterChange('showTampered')}
                          className="h-4 w-4 text-primary-600 rounded"
                        />
                        <label htmlFor="filter-tampered" className="ml-2 text-sm text-gray-700">
                          Show tampered
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="filter-clean"
                          type="checkbox"
                          checked={filterOptions.showClean}
                          onChange={() => handleFilterChange('showClean')}
                          className="h-4 w-4 text-primary-600 rounded"
                        />
                        <label htmlFor="filter-clean" className="ml-2 text-sm text-gray-700">
                          Show clean
                        </label>
                      </div>
                      
                      <h4 className="text-xs uppercase font-medium text-gray-500 mt-4">Protection</h4>
                      <div className="flex items-center">
                        <input
                          id="filter-protected"
                          type="checkbox"
                          checked={filterOptions.showProtected}
                          onChange={() => handleFilterChange('showProtected')}
                          className="h-4 w-4 text-primary-600 rounded"
                        />
                        <label htmlFor="filter-protected" className="ml-2 text-sm text-gray-700">
                          Show protected
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="filter-unprotected"
                          type="checkbox"
                          checked={filterOptions.showUnprotected}
                          onChange={() => handleFilterChange('showUnprotected')}
                          className="h-4 w-4 text-primary-600 rounded"
                        />
                        <label htmlFor="filter-unprotected" className="ml-2 text-sm text-gray-700">
                          Show unprotected
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Active filters indicators */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mt-3">
                {searchTerm && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span className="text-gray-600 mr-1">Search:</span>
                    <span className="font-medium text-gray-800">{searchTerm}</span>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {!filterOptions.showTampered && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span className="text-gray-800">Hiding tampered</span>
                    <button
                      onClick={() => handleFilterChange('showTampered')}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {!filterOptions.showClean && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span className="text-gray-800">Hiding clean</span>
                    <button
                      onClick={() => handleFilterChange('showClean')}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {!filterOptions.showProtected && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span className="text-gray-800">Hiding protected</span>
                    <button
                      onClick={() => handleFilterChange('showProtected')}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {!filterOptions.showUnprotected && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span className="text-gray-800">Hiding unprotected</span>
                    <button
                      onClick={() => handleFilterChange('showUnprotected')}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* History table */}
          <HistoryTable
            items={filteredItems}
            onViewDetails={handleViewDetails}
            onDelete={handleDelete}
          />
          
          {/* Pagination - simplified for demo */}
          {filteredItems.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredItems.length}</span> of{' '}
                <span className="font-medium">{items.length}</span> results
              </div>
              <nav className="inline-flex rounded-md shadow-sm">
                <button className="btn-outline btn-sm rounded-l-md rounded-r-none px-3">
                  Previous
                </button>
                <button className="btn-outline btn-sm rounded-r-md rounded-l-none px-3 border-l-0">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default History;