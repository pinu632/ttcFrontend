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
  setImgUrl: (url: string[] | string) => void;
  className?: string;
  triggerRef?: React.Ref<HTMLButtonElement | null>;
  maxSizeMB?: number;
  setImgId?: (id: string[] | string) => void;
}

export default function ImageUploadDialog({
  setImgUrl,
  className,
  triggerRef,
  maxSizeMB = 5,
  setImgId,
}: ImageUploadDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const user = useAppSelector((s) => s.auth.user);
  const userId = user.id;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearAll = () => {
    setFiles([]);
    setPreviews([]);
    setError("");
    setProgress(0);
    setSuccess(false);
    setUploading(false);
  };

  // =============== HANDLE MULTI FILE SELECTION ===============
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const maxBytes = maxSizeMB * 1024 * 1024;

    const validFiles = selected.filter((f) => {
      if (!allowed.includes(f.type)) {
        setError("Only JPEG, PNG, JPG, WEBP are allowed.");
        return false;
      }
      if (f.size > maxBytes) {
        setError(`File exceeds ${maxSizeMB} MB limit.`);
        return false;
      }
      return true;
    });

    setFiles(validFiles);
    setPreviews(validFiles.map((f) => URL.createObjectURL(f)));
    setError("");
    setSuccess(false);
    setProgress(0);
  };

  // ===================== UPLOAD MULTIPLE FILES =====================
  const uploadImages = async () => {
    if (!files.length) {
      setError("Please choose at least one image.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const formData = new FormData();
      files.forEach((f) => formData.append("photos", f));
      formData.append("uploaded_by", userId);

      const res = await api.post("/media/upload-multiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / (e.total || 1));
          setProgress(percent);
        },
      });

      const urls: string[] = res.data?.images?.map((img: any) => img.url) || [];
      const ids: string[] = res.data?.images?.map((img: any) => img._id) || [];

      setImgUrl(urls);
      if (setImgId) setImgId(ids);

      setUploading(false);
      setSuccess(true);
    } catch (err) {
      setUploading(false);
      console.log(err);
      setError("Upload failed. Try again.");
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && clearAll()}>
      <DialogTrigger className={className} asChild>
        <Button ref={triggerRef}>
          <UploadCloud className="w-4 h-4" />
          Upload Images
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-xl bg-card text-card-foreground shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            Upload Images
          </DialogTitle>
          <DialogDescription>Select multiple images to upload.</DialogDescription>
        </DialogHeader>

        {/* MULTI PREVIEW GRID */}
        {previews.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 max-h-[60dvh] overflow-y-scroll">
            {previews.map((src, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={src}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-md border"
                />
                <button
                  className="absolute top-1 right-1 bg-background/80 p-1 rounded-full border opacity-80 hover:opacity-100"
                  onClick={() => {
                    const updatedFiles = files.filter((_, i) => i !== idx);
                    const updatedPreviews = previews.filter((_, i) => i !== idx);
                    setFiles(updatedFiles);
                    setPreviews(updatedPreviews);
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer w-full h-40 rounded-xl border border-dashed flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/20"
          >
            <UploadCloud className="w-10 h-10 opacity-70" />
            <p className="mt-2 text-sm">Click to upload images</p>
            <p className="text-xs mt-1">PNG, JPG, WEBP • Max {maxSizeMB}MB each</p>
          </div>
        )}

        <Input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {error && <p className="text-destructive text-sm">{error}</p>}

        {success && (
          <div className="flex items-center gap-2 text-green-600 mt-2">
            <CheckCircle className="w-5 h-5" />
            Images uploaded successfully!
          </div>
        )}

        {uploading && (
          <div className="mt-4">
            <Progress value={progress} className="h-2 rounded-full" />
            <p className="text-xs mt-1 text-muted-foreground">
              Uploading… {progress}%
            </p>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button onClick={uploadImages} disabled={uploading} className="w-full">
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
