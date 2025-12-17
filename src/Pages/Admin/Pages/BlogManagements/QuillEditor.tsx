import { forwardRef, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./custom-editor.css";

import api from "@/Axios/axiosInstance";
import { useAppSelector } from "@/store/hook";
import { useParams } from "react-router-dom";

export interface CustomEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  readOnly?: boolean;
  placeholder?: string;
}

const CustomEditor = forwardRef<HTMLDivElement, CustomEditorProps>(
  (
    {
      value = "",
      onChange,
      readOnly = false,
      placeholder = "Write something...",
    },
    _ref
  ) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);

    // 🔹 Track uploaded image IDs (SOURCE OF TRUTH)
    const uploadedImageIdsRef = useRef<string[]>([]);

    const user = useAppSelector((s) => s.auth.user);
    const { Id: blogId } = useParams();

    /* ================================
       INIT QUILL
    ================================== */
    useEffect(() => {
      if (!editorRef.current || quillRef.current) return;

      /* ================================
         IMAGE UPLOAD HANDLER
      ================================== */
      const imageHandler = async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.click();

        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file || !user) return;

          const formData = new FormData();
          formData.append("photo", file);
          formData.append("uploaded_by", user.id);

          try {
            // 1️⃣ Upload image
            const res = await api.post("/media/upload", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            const imageUrl: string = res.data.url;
            const imageId: string = res.data._id;

            if (!imageUrl || !imageId) return;

            // 2️⃣ Attach blog context
            await api.post("/media/update", {
              id: imageId,
              blog: blogId,
              type: "Blog Content Image",
            });

            if (!quillRef.current) return;

            // 3️⃣ Insert image into editor
            const range = quillRef.current.getSelection(true);
            quillRef.current.insertEmbed(range.index, "image", imageUrl);
            quillRef.current.setSelection(range.index + 1);

            // 4️⃣ Store image ID
            uploadedImageIdsRef.current.push(imageId);

            // 5️⃣ Attach image ID to <img> element
            setTimeout(() => {
              const imgs =
                quillRef.current?.root.querySelectorAll("img");
              const lastImg = imgs?.[imgs.length - 1];
              if (lastImg) {
                lastImg.setAttribute("data-image-id", imageId);
              }
            }, 0);
          } catch (err) {
            console.error("Image upload failed", err);
            alert("Image upload failed");
          }
        };
      };

      /* ================================
         QUILL MODULES
      ================================== */
      //@ts-ignore
      const modules: Quill.Modules = {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["link", "image"],
            ["clean"],
          ],
          handlers: {
            image: imageHandler,
          },
        },
      };

      /* ================================
         CREATE QUILL INSTANCE
      ================================== */
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules,
        placeholder,
        readOnly,
      });

      quillRef.current = quill;

      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }

      /* ================================
         CHANGE HANDLER (DELETE DETECTION)
      ================================== */
      quill.on("text-change", () => {
        if (!quillRef.current) return;

        // 🔹 Get all image IDs currently in editor
        const editorImageIds = Array.from(
          quill.root.querySelectorAll<HTMLImageElement>("img")
        )
          .map((img) => img.getAttribute("data-image-id"))
          .filter(Boolean) as string[];

        // 🔹 Detect removed images
        const deletedImageIds = uploadedImageIdsRef.current.filter(
          (id) => !editorImageIds.includes(id)
        );

        // 🔹 Delete removed images
        deletedImageIds.forEach(async (id) => {
          try {

            await api.post("/media/delete", {
              //@ts-ignore
              id
            });

            uploadedImageIdsRef.current =
              uploadedImageIdsRef.current.filter(
                (imgId) => imgId !== id
              );
          } catch (err) {
            console.error("Failed to delete image", err);
          }
        });

        onChange?.(quill.root.innerHTML);
      });
    }, [placeholder, readOnly, onChange, value, user, blogId]);

    /* ================================
       SYNC EXTERNAL VALUE
    ================================== */
    useEffect(() => {
      if (
        quillRef.current &&
        value !== quillRef.current.root.innerHTML
      ) {
        quillRef.current.clipboard.dangerouslyPasteHTML(value || "");
      }
    }, [value]);

    return <div ref={editorRef} className="custom-editor-container" />;
  }
);

CustomEditor.displayName = "CustomEditor";
export default CustomEditor;
