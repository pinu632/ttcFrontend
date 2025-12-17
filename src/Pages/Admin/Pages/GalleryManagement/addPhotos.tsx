import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { UploadCloud, Image as ImageIcon } from "lucide-react";
import ImageUploadDialog from "@/components/Uploder/multifileUpload";

export default function GalleryUploadPage() {
  const [uploadedImages, setUploadedImages] = useState<any>([]);

  const handleUploads = (urls: any) => {
    setUploadedImages((prev: any) => [...prev, ...urls]);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Tech Talk Gallery Uploads
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload event photos, posters, and highlights to keep the Tech Talk Gallery updated.
          </p>
        </header>

        {/* Upload Section */}
        <div className="flex justify-center mt-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 px-7 py-3 text-lg rounded-xl bg-primary hover:bg-primary/85 shadow-lg shadow-primary/25 transition">
                <UploadCloud className="w-5 h-5" />
                Upload Images
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-card border border-border text-foreground rounded-xl shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-blue-400" />
                  Upload to Gallery
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Select one or more images to upload.
                </DialogDescription>
              </DialogHeader>

              <ImageUploadDialog setImgUrl={handleUploads} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Gallery Grid */}
        <section className="mt-12">
          {uploadedImages.length === 0 ? (
            <p className="text-center text-muted-foreground text-lg">
              No images uploaded yet. Start by clicking the upload button above.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {uploadedImages.map((url: any, idx: number) => (
                <Card
                  key={idx}
                  className="bg-card border border-border rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                >
                  <CardContent className="p-2">
                    <img
                      src={url}
                      alt="Uploaded"
                      className="w-full h-56 object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
