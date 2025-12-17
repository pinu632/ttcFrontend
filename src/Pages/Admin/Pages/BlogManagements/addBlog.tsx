"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../../components/common/ComponentCard";
import { toast } from "react-toastify";
import api from "@/Axios/axiosInstance";
import ImageUploadDialog from "@/components/Uploder/uploader";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, Loader2 } from "lucide-react";
import { useAppSelector } from "@/store/hook";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Cover upload
  const [cover, setCover] = useState<string | null>(null);
  const [coverId, setCoverId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const user = useAppSelector( s=> s.auth.user)

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    read_time: "",
    cover: "",
    status: "Draft",
  });

  // Sync uploaded cover URL
  useEffect(() => {
    if (cover) {
      setFormData((prev) => ({ ...prev, cover }));
    }
  }, [cover]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleChangeByField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) return toast.error("Title is required");
    if (!formData.excerpt.trim()) return toast.error("Excerpt is required");
    if (!formData.category) return toast.error("Category is required");
    if (!formData.cover) return toast.error("Please upload cover image");

    setLoading(true);
    try {
      const res = await api.post("/blogs", {
        ...formData, authorId: user?.id,
      });

      const blogId = res?.data?.data?._id || res?.data?._id;
      if (!blogId) throw new Error("Blog ID not found");

      // optional: attach media meta
      if (coverId) {
        await api.post("/media/update", {
          id: coverId,
          blog: blogId,
          type: "Blog Cover",
        });
      }

      toast.success("Blog draft created");
      navigate(`/blogs/editor/${blogId}`);
    } catch (err) {
      toast.error("Error creating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <PageBreadcrumb pageTitle="Create Blog" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="Blog Meta Details" className="border-none bg-transparent" buttonReq={false}>
            <div className="space-y-6">

              {/* Cover Upload */}
              <div
                onClick={() => fileRef.current?.click()}
                className="group h-[200px] w-[320px] rounded-xl border border-dashed
                flex flex-col justify-center items-center cursor-pointer transition
                hover:border-primary hover:bg-primary/10"
              >
                {cover ? (
                  <img
                    src={cover}
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                    <p className="text-sm mt-2">Upload Blog Cover</p>
                    <p className="text-xs opacity-60">PNG, JPG • Max 5MB</p>
                  </div>
                )}
              </div>

              <ImageUploadDialog
                //@ts-ignore
                setImgUrl={setCover}
                //@ts-ignore
                setImgId={setCoverId}
                //@ts-ignore
                triggerRef={fileRef}
                className="hidden"
              />

              {/* Title */}
              <div className="space-y-1">
                <Label>Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="AI in everyday life: The tech behind the scenes"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-1">
                <Label>Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Short summary that appears in blog cards"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <Label>Category</Label>
                <Select
                  onValueChange={(v) => handleChangeByField("category", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Backend">Backend</SelectItem>
                    <SelectItem value="Frontend">Frontend</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Read Time */}
              <div className="space-y-1">
                <Label>Read Time</Label>
                <Input
                  id="read_time"
                  value={formData.read_time}
                  onChange={handleChange}
                  placeholder="10 min"
                />
              </div>
            </div>
          </ComponentCard>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-4 w-full py-3 rounded-sm font-medium text-white 
              ${loading ? "bg-primary/50" : "bg-primary hover:bg-primary/90"}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Creating Draft...
              </span>
            ) : (
              "Create & Start Writing"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
