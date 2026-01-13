import { AlertCircleIcon, ImageUpIcon, XIcon, UploadCloud } from "lucide-react";
import React, { useEffect, useRef, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFileUpload } from "@/hooks/use-file-upload";

interface iProps {
  setImage: React.Dispatch<SetStateAction<File | null>>;
}

export default function SingleImageUploader({ setImage }: iProps) {
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
  });

  useEffect(() => {
    if (files.length > 0) {
      setImage(files[0]?.file);
    } else {
      setImage(null);
    }
  }, [files, setImage]);

  const previewUrl = files[0]?.preview || null;

  return (
    <div className="w-full rounded-xl shadow-sm">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={(e) => setFiles(e.target.files)}
        />

        {!previewUrl ? (
          <div
            role="button"
            onClick={() => inputRef.current?.click()}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={cn(
              "flex h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed transition-all",
              isDragging
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-muted-foreground/25 bg-muted/50 hover:bg-muted"
            )}
          >
            <div className="rounded-full bg-background p-3 shadow-sm border">
              <ImageUpIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-center px-4">
              <p className="text-sm font-medium">Click to select</p>
              <p className="text-xs text-muted-foreground">
                or drag and drop image here
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="group relative h-48 overflow-hidden rounded-lg border bg-muted">
              <img
                src={previewUrl}
                alt="Preview"
                className="size-full object-cover transition-all group-hover:scale-105"
              />
              {/* Overlay with Upload/Delete icons on hover */}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center my-auto gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex flex-1 mt-5 items-center gap-2 ">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    onClick={() => inputRef.current?.click()}
                  >
                    <UploadCloud className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-9 w-9 rounded-lg"
                    onClick={() => removeFile(files[0].id)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>

                <span className="flex items-center justify-center  border border-border w-full  bg-muted/50 p-2 text-sm text-muted-foreground font-bold ">
                  {files[0].file.name}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1.5 text-xs font-semibold"
          role="alert"
        >
          <AlertCircleIcon className="size-3.5" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
