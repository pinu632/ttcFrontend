"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ImageIcon, UploadCloud, X } from "lucide-react";

import api from "@/Axios/axiosInstance";
import { useAppSelector } from "@/store/hook";

export interface ImageUploadDialogProps {
  setImgUrl: (url: string) => void;
  className?: string;
  triggerRef?: React.Ref<HTMLButtonElement | null>;
  maxSizeMB?: number;
  setImgId?: (id: string) => void;
}

export default function ImageUploadDialog({
  setImgUrl,
  className,
  triggerRef,
  maxSizeMB = 5,
  setImgId
}: ImageUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = useAppSelector((s) => s.auth.user);
  const userId = user.id;

  // Reset states when closing dialog
  const clearAll = () => {
    setFile(null);
    setPreview(null);
    setError("");
    setProgress(0);
    setSuccess(false);
    setUploading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const maxBytes = maxSizeMB * 1024 * 1024;

    if (!allowedTypes.includes(f.type)) {
      setError("Only JPEG, PNG, or WebP images are allowed.");
      return;
    }
    if (f.size > maxBytes) {
      setError(`File exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
    setProgress(0);
    setSuccess(false);
  };

  const uploadImage = async () => {
    if (!file) {
      setError("Please choose an image first.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("photo", file);
      formData.append("uploaded_by", userId);

      const res = await api.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / (e.total || 1));
          setProgress(percent);
        },
      });

      // Extract URL from API response
      const imageUrl = res?.data?.url;
      const id = res?.data?._id;
      if (id && setImgId) setImgId(id);
      if (imageUrl) setImgUrl(imageUrl);


      setUploading(false);
      setSuccess(true);
    } catch (err) {
      setUploading(false);
      console.log(err)
      setError("Upload failed. Try again.");
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && clearAll()}>
      <DialogTrigger className={className} asChild>
        <Button ref={triggerRef}>
          <UploadCloud className="w-4 h-4" />
          Upload Image
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-xl border-border bg-card text-card-foreground shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <ImageIcon className="w-5 h-5 text-primary" />
            Upload Image
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose an image and upload it to save.
          </DialogDescription>
        </DialogHeader>

        {/* Preview Box */}
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="preview"
              className="mx-auto w-auto h-48 rounded-lg object-contain border border-border"
            />
            <button
              className="absolute top-2 right-2 bg-background/70 backdrop-blur-sm p-1 rounded-full border border-border"
              onClick={() => {
                setPreview(null);
                setFile(null);
              }}
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer w-full h-40 rounded-xl border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/20 transition"
          >
            <UploadCloud className="w-10 h-10 opacity-70" />
            <p className="mt-2 text-sm">Click here to upload image</p>
            <p className="text-xs mt-1">PNG, JPG, WEBP • Max {maxSizeMB}MB</p>
          </div>
        )}

        {/* Input */}
        <Input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Error */}
        {error && <p className="text-destructive text-sm mt-1">{error}</p>}

        {/* Success */}
        {success && (
          <div className="flex items-center gap-2 text-green-600 font-medium mt-2">
            <CheckCircle className="w-5 h-5" />
            File uploaded successfully!
          </div>
        )}

        {/* Progress Bar */}
        {uploading && (
          <div className="mt-4">
            <Progress value={progress} className="h-2 rounded-full bg-muted" />
            <p className="text-xs mt-1 text-muted-foreground">
              Uploading… {progress}%
            </p>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button
            onClick={uploadImage}
            disabled={uploading}
            className="rounded-xl w-full"
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
