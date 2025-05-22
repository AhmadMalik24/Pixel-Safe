import React, { useState } from 'react';
import { Download, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface ResultViewerProps {
  image: {
    url: string;
    name: string;
  };
  result: {
    heatmapUrl: string;
    confidence: number;
    tamperedRegions: number;
    analysisDate: Date;
    metadata: {
      label: string;
      value: string;
    }[];
  };
}

const ResultViewer: React.FC<ResultViewerProps> = ({ image, result }) => {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showMetadata, setShowMetadata] = useState(false);
  
  // Determine confidence level styling and label
  const getConfidenceLevelInfo = (confidence: number) => {
    if (confidence >= 90) {
      return {
        color: 'text-error-700',
        bgColor: 'bg-error-100',
        barColor: 'bg-error-500',
        label: 'High Probability of Tampering',
      };
    } else if (confidence >= 50) {
      return {
        color: 'text-warning-700',
        bgColor: 'bg-warning-100',
        barColor: 'bg-warning-500',
        label: 'Possible Tampering',
      };
    } else {
      return {
        color: 'text-success-700',
        bgColor: 'bg-success-100',
        barColor: 'bg-success-500',
        label: 'Low Probability of Tampering',
      };
    }
  };
  
  const confidenceInfo = getConfidenceLevelInfo(result.confidence);
  
  return (
    <div className="card overflow-hidden">
      {/* Image and heatmap overlay */}
      <div className="relative aspect-video">
        <img 
          src={image.url} 
          alt={image.name} 
          className="w-full h-full object-contain bg-gray-100"
        />
        
        {showHeatmap && (
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={result.heatmapUrl} 
              alt="Tampering heatmap" 
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
        )}
        
        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{image.name}</h3>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowHeatmap(!showHeatmap)}
                className="px-2 py-1 bg-white/20 rounded hover:bg-white/30 text-xs font-medium flex items-center"
              >
                {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
              </button>
              <button 
                className="px-2 py-1 bg-white/20 rounded hover:bg-white/30 text-xs font-medium flex items-center"
              >
                <Download size={14} className="mr-1" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Analysis results */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-4">
          {/* Confidence score */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-sm font-medium">Tampering Confidence</h4>
              <span className={`${confidenceInfo.color} font-medium text-sm`}>{result.confidence}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${confidenceInfo.barColor}`} 
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
            <div className="mt-1 flex items-center">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${confidenceInfo.bgColor} ${confidenceInfo.color}`}>
                {confidenceInfo.label}
              </span>
              {result.tamperedRegions > 0 && (
                <span className="ml-2 text-xs text-gray-500">
                  {result.tamperedRegions} suspicious {result.tamperedRegions === 1 ? 'region' : 'regions'} detected
                </span>
              )}
            </div>
          </div>
          
          {/* Metadata toggle */}
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className="flex items-center justify-between w-full px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium flex items-center">
              <Info size={16} className="mr-2 text-gray-500" />
              Technical Metadata
            </span>
            {showMetadata ? (
              <ChevronUp size={16} className="text-gray-500" />
            ) : (
              <ChevronDown size={16} className="text-gray-500" />
            )}
          </button>
          
          {/* Metadata details */}
          {showMetadata && (
            <div className="mt-3 bg-gray-50 rounded-md p-4">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="col-span-2">
                  <dt className="text-gray-500">Analysis Timestamp</dt>
                  <dd className="font-medium text-gray-900">{result.analysisDate.toLocaleString()}</dd>
                </div>
                
                {result.metadata.map((item, index) => (
                  <div key={index} className={index % 2 === 0 && index === result.metadata.length - 1 ? 'col-span-2' : ''}>
                    <dt className="text-gray-500">{item.label}</dt>
                    <dd className="font-medium text-gray-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultViewer;