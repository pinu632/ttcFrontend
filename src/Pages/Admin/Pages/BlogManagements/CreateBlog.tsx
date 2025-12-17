import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";

import { Eye, Menu, X, Loader2, FileText, PenLine, Archive, Settings } from "lucide-react";

import CustomEditor from "./QuillEditor";
import FloatingMenu from "@/components/FloatingMenu/floatingMenu";
import api from "@/Axios/axiosInstance";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/store/hook";

export default function CreateBlog() {
  const { Id: blogId } = useParams();
  const user = useAppSelector((s) => s.auth.user);
  console.log(user)

  const [editorContent, setEditorContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* =======================
     Fetch blog content
  ======================= */
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${blogId}`);
        setEditorContent(res.data.data?.content || "");
      } catch (err) {
        console.error("Failed to load blog", err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchBlog();
  }, [blogId]);

  /* =======================
     Autosave (debounced)
  ======================= */
  const autosave = async (content: string) => {
    if (!blogId) return;
    setSaving(true);
    try {
      await api.post("/blogs/autosave", { blogId, content, authorId:user?.id });
    } catch (err) {
      console.error("Autosave failed", err);
    } finally {
      setSaving(false);
    }
  };

  const debouncedAutosave = useCallback(debounce(autosave, 5000), [blogId]);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    debouncedAutosave(content);
  };

  /* =======================
     Loading state
  ======================= */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Blog Editor</h1>

          <div className="flex items-center gap-2">
            {saving && <Badge variant="secondary">Saving…</Badge>}

            <Button variant="outline" size="sm" onClick={() => setShowPreview(true)}>
              <Eye className="h-4 w-4 mr-1" /> Preview
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Editor */}
      <main className="h-[calc(100vh-64px)] overflow-hidden">
        <Card className="h-full max-w-6xl mx-auto rounded-none sm:rounded-xl sm:mt-4">
          <CustomEditor
            value={editorContent}
            onChange={handleEditorChange}
            placeholder="Start writing your blog here…"
          />
        </Card>
      </main>

      {/* Sidebar Menu */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-72 z-999">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <ul className="mt-6 space-y-4 text-sm p-3">
            <li className="flex items-center gap-2 cursor-pointer hover:text-primary">
              <FileText className="h-4 w-4" /> Open Recent
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-primary">
              <PenLine className="h-4 w-4" /> Resume Drafting
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-primary">
              <Archive className="h-4 w-4" /> Saved Blogs
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-primary">
              <Settings className="h-4 w-4" /> Settings
            </li>
          </ul>
        </SheetContent>
      </Sheet>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center">
          <Card className="relative w-full max-w-4xl h-[90vh] overflow-hidden">
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-3 top-3"
              onClick={() => setShowPreview(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="p-4 border-b font-semibold">Live Preview</div>

            <div
              className="prose max-w-none p-6 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: editorContent }}
            />
          </Card>
        </div>
      )}

      {/* Mobile Floating Menu */}
      <FloatingMenu setShowPreview={setShowPreview} setMenuOpen={setMenuOpen} />
    </div>
  );
}
