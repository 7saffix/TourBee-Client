import { useState, useCallback } from "react";

interface FileWithPreview {
  id: string;
  file: File;
  preview: string;
}

export function useFileUpload({
  accept,
  maxSize,
  multiple = false, // Add this default
}: {
  accept: string;
  maxSize: number;
  multiple?: boolean;
}) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFiles = useCallback(
    (incomingFiles: FileList | null) => {
      setErrors([]);
      if (!incomingFiles || incomingFiles.length === 0) return;

      const mimeTypeRegex = new RegExp(accept.replace("*", ".*"));
      const newEntries: FileWithPreview[] = [];
      const newErrors: string[] = [];

      // Convert FileList to Array to handle one or many
      const filesToProcess = Array.from(incomingFiles);

      // If single mode, we only care about the first file
      const processingList = multiple ? filesToProcess : [filesToProcess[0]];

      processingList.forEach((file) => {
        // 1. Validate Type
        if (!mimeTypeRegex.test(file.type)) {
          newErrors.push(`Invalid type: ${file.name}`);
          return;
        }

        // 2. Validate Size
        if (file.size > maxSize) {
          const sizeInMB = (maxSize / (1024 * 1024)).toFixed(0);
          newErrors.push(`${file.name} is too large (Max ${sizeInMB}MB)`);
          return;
        }

        newEntries.push({
          id: Math.random().toString(36).substring(7),
          file,
          preview: URL.createObjectURL(file),
        });
      });

      if (newErrors.length > 0) {
        setErrors(newErrors);
        // In multiple mode, we still add the valid ones. In single, we stop.
        if (!multiple) return;
      }

      setFiles((prev) => {
        // If single, replace. If multiple, append.
        if (!multiple) {
          // Cleanup old preview before replacing
          if (prev.length > 0) URL.revokeObjectURL(prev[0].preview);
          return newEntries;
        }
        return [...prev, ...newEntries];
      });
    },
    [accept, maxSize, multiple]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const removed = prev.find((f) => f.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  return [
    { files, isDragging, errors },
    {
      handleDragEnter: () => setIsDragging(true),
      handleDragLeave: () => setIsDragging(false),
      handleDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
      },
      handleDrop: (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      },
      removeFile,
      setFiles: handleFiles,
    },
  ] as const;
}
