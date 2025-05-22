import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image, AlertCircle, Check } from 'lucide-react';
import { toast } from '../layout/Toaster';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxSizeInMB?: number;
  withWatermark?: boolean;
  onWatermarkChange?: (enabled: boolean) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  maxFiles = 10,
  acceptedFileTypes = ['image/jpeg', 'image/png'],
  maxSizeInMB = 10,
  withWatermark = false,
  onWatermarkChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [watermarkEnabled, setWatermarkEnabled] = useState(false);
  
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach((file) => {
          file.errors.forEach((error: any) => {
            if (error.code === 'file-too-large') {
              toast.error(`File "${file.file.name}" is too large. Max size is ${maxSizeInMB}MB.`);
            } else if (error.code === 'file-invalid-type') {
              toast.error(`File "${file.file.name}" has an invalid type. Accepted types: ${acceptedFileTypes.join(', ')}`);
            } else {
              toast.error(`Error with file "${file.file.name}": ${error.message}`);
            }
          });
        });
      }
      
      // Handle accepted files
      if (acceptedFiles.length > 0) {
        // Check if adding these files would exceed maxFiles
        if (files.length + acceptedFiles.length > maxFiles) {
          toast.warning(`You can upload a maximum of ${maxFiles} files.`);
          // Add files up to the limit
          const remainingSlots = maxFiles - files.length;
          if (remainingSlots > 0) {
            const newFiles = [...files, ...acceptedFiles.slice(0, remainingSlots)];
            setFiles(newFiles);
            onFilesSelected(newFiles);
          }
        } else {
          const newFiles = [...files, ...acceptedFiles];
          setFiles(newFiles);
          onFilesSelected(newFiles);
          toast.success(`${acceptedFiles.length} file(s) added successfully.`);
        }
      }
    },
    [files, maxFiles, maxSizeInBytes, onFilesSelected]
  );
  
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSizeInBytes,
    maxFiles,
  });
  
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };
  
  const handleWatermarkToggle = () => {
    const newValue = !watermarkEnabled;
    setWatermarkEnabled(newValue);
    if (onWatermarkChange) {
      onWatermarkChange(newValue);
    }
  };
  
  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : isDragReject
            ? 'border-error-500 bg-error-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="p-3 bg-primary-100 rounded-full text-primary-600">
            <Upload size={24} />
          </div>
          <p className="text-base font-medium text-gray-700">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag & drop files here, or click to select files'}
          </p>
          <p className="text-sm text-gray-500">
            Upload up to {maxFiles} images (JPEG, PNG) of max {maxSizeInMB}MB each
          </p>
        </div>
      </div>
      
      {withWatermark && (
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            id="watermark"
            checked={watermarkEnabled}
            onChange={handleWatermarkToggle}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="watermark" className="text-sm text-gray-700">
            Apply invisible watermark to protect images
          </label>
        </div>
      )}
      
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files ({files.length}/{maxFiles})</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <li key={index} className="relative group">
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <div className="relative aspect-video bg-gray-100">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                        onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Image size={24} className="text-gray-400" />
                      </div>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove file"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;