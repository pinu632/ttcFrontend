import { useEffect, useState, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  MoreVertical,
  ExternalLink,
  Link as LinkIcon,
  Download,
  Star,
  Pencil,
  Folder,
  Eye,
  Trash,
} from "lucide-react";

import api from "@/Axios/axiosInstance";

export default function GalleryInfinitePage() {
  const [images, setImages] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageSize = 12;
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // ========= FETCH IMAGES ==========
  const fetchImages = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await api.post(`/media/list`, {
        pageNum,
        pageSize,
      });

      const data = res.data;

      if (!data?.data?.length) {
        setHasMore(false);
        return;
      }

      setImages((prev) => [...prev, ...data.data]);
      setPageNum((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to fetch images", error);
    } finally {
      setLoading(false);
    }
  }, [pageNum, hasMore, loading]);

  // ========= INTERSECTION OBSERVER ==========
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchImages();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [fetchImages, hasMore]);

  // ========= ADMIN MENU HANDLERS ============

  const handleView = (img: any) => {
    window.open(img.url, "_blank");
  };

  const handleCopyLink = async (img: any) => {
    try {
      await navigator.clipboard.writeText(img.url);
      alert("Link copied to clipboard!");
    } catch {
      alert("Failed to copy link.");
    }
  };

  const handleDownload = (img: any) => {
    const link = document.createElement("a");
    link.href = img.url;
    link.download = img.name || "image";
    link.click();
  };

  const handleSetCover = async (img: any) => {
    console.log("Setting cover:", img);
    alert("Set as cover (connect API)");
  };

  const handleRename = async (img: any) => {
    const newName = prompt("Enter new image name:", img.name || "");
    if (!newName) return;
    console.log("Renaming to:", newName);
    alert(`Rename to ${newName} (connect API)`);
  };

  const handleMove = async (img: any) => {
    const album = prompt("Enter target album name:");
    if (!album) return;
    console.log("Moving to:", album);
    alert(`Move to album ${album} (connect API)`);
  };

  const handleToggleVisibility = async (img: any) => {
    console.log("Toggling visibility:", img);
    alert("Visibility updated (connect API)");
  };

  const handleDelete = async (img: any) => {
    const ok = confirm("Are you sure? This action cannot be undone!");
    if (!ok) return;

    try {
      console.log("Deleting:", img);
      alert("Image deleted (connect API)");
    } catch {
      alert("Failed to delete image");
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground py-10 px-4 ">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center">TechTalk Gallery</h1>
        <p className="text-center text-muted-foreground mt-2 mb-8">
          Scroll to load more images…
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {images.map((img, index) => (
            <Card key={img._id || index} className="border-none bg-transparent ">
              <CardContent className="p-2">
                <div className="relative group">

                  {/* ================= ADMIN MENU ================= */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 z-10 rounded-full 
                        bg-background/70 backdrop-blur shadow-sm opacity-0 
                        group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Admin Controls</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem onClick={() => handleView(img)}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Full Image
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => handleCopyLink(img)}>
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Copy Link
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => handleDownload(img)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem onClick={() => handleSetCover(img)}>
                        <Star className="mr-2 h-4 w-4" />
                        Set as Cover
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => handleRename(img)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => handleMove(img)}>
                        <Folder className="mr-2 h-4 w-4" />
                        Move to Album
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleToggleVisibility(img)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        {img.isPublic ? "Make Private" : "Make Public"}
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleDelete(img)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* IMAGE */}
                  <img
                    src={img.url}
                    alt="Gallery Item"
                    className="w-full h-64 object-cover rounded-lg -z-10"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center mt-4 text-muted-foreground">Loading…</p>
        )}

        {/* OBSERVER TARGET */}
        <div ref={loaderRef} className="h-10" />

        {/* END MESSAGE */}
        {!hasMore && (
          <p className="text-center mt-4 text-muted-foreground">
            All images loaded.
          </p>
        )}
      </div>
    </div>
  );
}
