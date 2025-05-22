import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Download, ExternalLink, Trash2 } from 'lucide-react';
import { toast } from '../layout/Toaster';

export interface HistoryItem {
  id: string;
  fileName: string;
  thumbnailUrl: string;
  analysisDate: Date;
  confidence: number;
  tamperedRegions: number;
  protected: boolean;
  reportUrl: string;
}

interface HistoryTableProps {
  items: HistoryItem[];
  onViewDetails: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ items, onViewDetails, onDelete }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const toggleExpand = (id: string) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(item => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };
  
  const handleDownload = (url: string, fileName: string) => {
    // In a real app, this would trigger the actual download
    toast.success(`Downloading report for ${fileName}...`);
  };
  
  const handleDelete = (id: string, fileName: string) => {
    // Confirm before deletion
    if (window.confirm(`Are you sure you want to delete the analysis for ${fileName}?`)) {
      onDelete(id);
      toast.info(`Analysis for ${fileName} has been deleted.`);
    }
  };
  
  // Get status badge based on confidence
  const getStatusBadge = (confidence: number) => {
    if (confidence >= 90) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
          High Risk
        </span>
      );
    } else if (confidence >= 50) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
          Moderate Risk
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
          Low Risk
        </span>
      );
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No history items found.</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="pl-4 pr-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              Image
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              File Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Date
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {items.map((item) => {
            const isExpanded = expandedItems.includes(item.id);
            
            return (
              <React.Fragment key={item.id}>
                <tr className={isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                  <td className="whitespace-nowrap pl-4 pr-3 py-4 sm:pl-6">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="mr-2 text-gray-400 hover:text-gray-500"
                      >
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={item.thumbnailUrl}
                          alt={item.fileName}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    <div className="font-medium">{item.fileName}</div>
                    <div className="text-gray-500">
                      {item.protected && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                          Protected
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    {getStatusBadge(item.confidence)}
                    <div className="text-gray-500 text-xs mt-1">
                      {item.tamperedRegions} region{item.tamperedRegions !== 1 ? 's' : ''}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.analysisDate.toLocaleDateString()}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onViewDetails(item)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <ExternalLink size={16} />
                        <span className="sr-only">View details</span>
                      </button>
                      <button
                        onClick={() => handleDownload(item.reportUrl, item.fileName)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Download size={16} />
                        <span className="sr-only">Download</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.fileName)}
                        className="text-error-600 hover:text-error-900"
                      >
                        <Trash2 size={16} />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded row with details */}
                {isExpanded && (
                  <tr>
                    <td colSpan={5} className="px-8 py-4 bg-gray-50">
                      <div className="flex">
                        <div className="mr-6">
                          <img
                            className="h-32 rounded-md object-cover"
                            src={item.thumbnailUrl}
                            alt={item.fileName}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">Analysis Details</h4>
                          <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div>
                              <dt className="text-gray-500">File Name</dt>
                              <dd className="font-medium">{item.fileName}</dd>
                            </div>
                            <div>
                              <dt className="text-gray-500">Analysis Date</dt>
                              <dd className="font-medium">{item.analysisDate.toLocaleString()}</dd>
                            </div>
                            <div>
                              <dt className="text-gray-500">Tampering Confidence</dt>
                              <dd className="font-medium">{item.confidence}%</dd>
                            </div>
                            <div>
                              <dt className="text-gray-500">Suspicious Regions</dt>
                              <dd className="font-medium">{item.tamperedRegions}</dd>
                            </div>
                            <div>
                              <dt className="text-gray-500">Protection Status</dt>
                              <dd className="font-medium">
                                {item.protected ? 'Watermarked' : 'Not Protected'}
                              </dd>
                            </div>
                          </dl>
                          <div className="mt-4 flex space-x-2">
                            <button
                              onClick={() => onViewDetails(item)}
                              className="btn-primary btn-sm"
                            >
                              View Full Analysis
                            </button>
                            <button
                              onClick={() => handleDownload(item.reportUrl, item.fileName)}
                              className="btn-outline btn-sm"
                            >
                              <Download size={16} className="mr-1" />
                              Download Report
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;