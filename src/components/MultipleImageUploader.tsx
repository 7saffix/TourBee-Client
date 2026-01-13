import { AlertCircleIcon, XIcon, UploadCloud } from "lucide-react";
import React, { useEffect, useRef, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFileUpload } from "@/hooks/use-file-upload";

interface iProps {
  setImages: React.Dispatch<SetStateAction<File[]>>;
}

export default function MultipleImageUploader({ setImages }: iProps) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;
  const inputRef = useRef<HTMLInputElement>(null);

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      removeFile,
      setFiles,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
    multiple: true,
  });

  useEffect(() => {
    if (files.length > 0) {
      const imagesFile = files.map((img) => img.file);
      setImages(imagesFile);
    } else {
      setImages([]);
    }
  }, [files, setImages]);

  return (
    <div className="w-full space-y-4">
      {/* Dropzone Area */}
      <div className="relative">
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={(e) => setFiles(e.target.files)}
        />

        <div
          role="button"
          onClick={() => inputRef.current?.click()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-all",
            isDragging
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "border-muted-foreground/25 bg-muted/50 hover:bg-muted"
          )}
        >
          <div className="rounded-full bg-background p-2 shadow-sm border border-border">
            <UploadCloud className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-medium">
              Click to upload or drag images
            </p>
            <p className="text-xs text-muted-foreground tracking-tight">
              Max {maxSizeMB}MB per file
            </p>
          </div>
        </div>
      </div>

      {/* Preview Grid - This maps through ALL files */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {files.map((fileEntry) => (
            <div
              key={fileEntry.id}
              className="group relative h-28 overflow-hidden rounded-lg border border-border bg-muted shadow-sm"
            >
              <img
                src={fileEntry.preview}
                alt="Preview"
                className="size-full object-cover transition-all group-hover:scale-110"
              />

              {/* Hover Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 rounded-full shadow-lg"
                  onClick={() => removeFile(fileEntry.id)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>

              {/* Filename Tag */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                <p className="truncate text-[10px] text-white font-medium">
                  {fileEntry.file.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, idx) => (
            <div
              key={idx}
              className="text-destructive flex items-center gap-1.5 text-xs font-semibold"
              role="alert"
            >
              <AlertCircleIcon className="size-3.5" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
