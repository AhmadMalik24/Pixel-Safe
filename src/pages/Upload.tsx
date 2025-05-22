import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Upload as UploadIcon, AlertCircle, Info } from 'lucide-react';
import FileUploader from '../components/upload/FileUploader';
import PageHeader from '../components/common/PageHeader';
import ResultViewer from '../components/results/ResultViewer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { toast } from '../components/layout/Toaster';

const Upload = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [withWatermark, setWithWatermark] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  
  // Check if we're in protection mode from URL params
  useEffect(() => {
    const protectMode = searchParams.get('protect') === 'true';
    setWithWatermark(protectMode);
  }, [searchParams]);
  
  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    // Reset results when new files are selected
    setResults([]);
  };
  
  const handleWatermarkChange = (enabled: boolean) => {
    setWithWatermark(enabled);
  };
  
  const handleAnalyze = async () => {
    if (files.length === 0) {
      toast.warning('Please select at least one image to analyze.');
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // In a real app, this would upload the files to the server for analysis
      // Here we're just simulating the process with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results for demonstration
      const mockResults = files.map((file, index) => {
        // Generate a random confidence score, biased higher if the file name contains certain terms
        const filename = file.name.toLowerCase();
        const biasHigher = filename.includes('fake') || 
                           filename.includes('edit') || 
                           filename.includes('photoshop');
        
        // Create a sample confidence score
        const baseTamperedConfidence = biasHigher ? 75 : 25;
        const randomFactor = Math.random() * 25;
        const confidence = Math.min(Math.round(baseTamperedConfidence + randomFactor), 100);
        
        // Random number of tampered regions
        const tamperedRegions = confidence > 50 ? Math.floor(Math.random() * 5) + 1 : 0;
        
        return {
          id: `result-${index}`,
          imageUrl: URL.createObjectURL(file),
          fileName: file.name,
          heatmapUrl: 'https://images.pexels.com/photos/3224171/pexels-photo-3224171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          confidence,
          tamperedRegions,
          analysisDate: new Date(),
          metadata: [
            { label: 'File Size', value: `${(file.size / 1024 / 1024).toFixed(2)} MB` },
            { label: 'Image Dimensions', value: '1920 x 1080 px' },
            { label: 'File Type', value: file.type },
            { label: 'Protection', value: withWatermark ? 'Watermarked' : 'None' },
            { label: 'Analysis Method', value: 'AI + Bit-level' },
          ],
          protected: withWatermark,
        };
      });
      
      setResults(mockResults);
      
      // Show success message
      if (files.length > 1) {
        toast.success(`${files.length} images analyzed successfully.`);
      } else {
        toast.success('Image analyzed successfully.');
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('An error occurred during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleSaveResults = () => {
    // In a real app, this would save the results to the user's history
    toast.success('Results saved to your history.');
    navigate('/app/history');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title={withWatermark ? "Protect Your Image" : "Analyze Your Image"}
        description={
          withWatermark 
            ? "Upload images to apply invisible watermarks for protection against tampering"
            : "Upload images to detect potential manipulation using our AI-powered analysis"
        }
      />
      
      <div className="mt-6 max-w-4xl mx-auto">
        {/* File uploader */}
        <div className="card p-6">
          <FileUploader
            onFilesSelected={handleFilesSelected}
            maxFiles={10}
            acceptedFileTypes={['image/jpeg', 'image/png']}
            maxSizeInMB={10}
            withWatermark={true}
            onWatermarkChange={handleWatermarkChange}
          />
          
          {files.length > 0 && !isAnalyzing && results.length === 0 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleAnalyze}
                className="btn-primary btn-lg"
              >
                <UploadIcon size={18} className="mr-2" />
                {withWatermark ? 'Protect Images' : 'Analyze Images'}
              </button>
            </div>
          )}
          
          {/* Information alert for watermarking */}
          {withWatermark && (
            <div className="mt-6 flex p-4 bg-primary-50 rounded-md">
              <Info className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-primary-800">About Image Protection</h3>
                <div className="mt-2 text-sm text-primary-700">
                  <p>
                    Our invisible watermarking technology embeds a unique signature in your image that:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Is imperceptible to the human eye</li>
                    <li>Survives most image editing operations</li>
                    <li>Can be verified later to prove your ownership</li>
                    <li>Helps detect if your image has been tampered with</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Warning for non-watermarked images */}
          {!withWatermark && files.length > 0 && (
            <div className="mt-6 flex p-4 bg-warning-50 rounded-md">
              <AlertCircle className="h-5 w-5 text-warning-500 flex-shrink-0 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-warning-800">Your images are not protected</h3>
                <div className="mt-2 text-sm text-warning-700">
                  <p>
                    Enable the watermarking option above to add invisible protection to your images.
                    This makes it easier to verify authenticity in the future.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Loading state */}
        {isAnalyzing && (
          <div className="mt-8">
            <LoadingSpinner 
              size="large" 
              text={withWatermark ? "Applying watermark protection..." : "Analyzing your images..."} 
            />
          </div>
        )}
        
        {/* Results section */}
        {results.length > 0 && (
          <div className="mt-8 space-y-8">
            <h2 className="text-xl font-semibold text-gray-900">Analysis Results</h2>
            
            {results.map((result, index) => (
              <ResultViewer
                key={result.id}
                image={{
                  url: result.imageUrl,
                  name: result.fileName,
                }}
                result={{
                  heatmapUrl: result.heatmapUrl,
                  confidence: result.confidence,
                  tamperedRegions: result.tamperedRegions,
                  analysisDate: result.analysisDate,
                  metadata: result.metadata,
                }}
              />
            ))}
            
            <div className="flex justify-center space-x-4 pt-4">
              <button
                onClick={handleSaveResults}
                className="btn-primary btn-lg"
              >
                Save Results to History
              </button>
              <button
                onClick={() => {
                  setFiles([]);
                  setResults([]);
                }}
                className="btn-outline btn-lg"
              >
                Analyze More Images
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;