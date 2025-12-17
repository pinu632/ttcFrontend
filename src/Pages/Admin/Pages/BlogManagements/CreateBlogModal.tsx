import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageUploadDialog from "@/components/Uploder/uploader";


import axios from "axios";
import {toast} from 'react-toastify'
import { useAppSelector } from "@/store/hook";

export default function CreateBlogModal({ isOpen, onClose }:any) {
  const navigate = useNavigate();
const user = useAppSelector(s => s.auth.user)
const data = user

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    author: data.rollno,
    read_time: "",
    category: "",
    cover: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


   useEffect(()=>{
    console.log("reached")
    console.log("formData: ",formData)
  },[formData])

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
 

  const validateStep = () => {
    const stepErrors = {};
    if (currentStep === 0 && !formData.title.trim()) {
      stepErrors.title = "Title is required";
    }
    if (currentStep === 1 && !formData.excerpt.trim()) {
      stepErrors.excerpt = "Excerpt is required";
    }
    if (currentStep === 2 && !formData.category.trim()) {
      stepErrors.category = "Category is required";
    }
    if (currentStep === 3 && !formData.cover) {
      stepErrors.cover = "please upload cover phote"
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return; // stop if current step is invalid

    setLoading(true);

    try {
      // Send JSON payload
      const response = await axios.post(
        `${baseUrl}/blog/createMeta`,
        {
          title: formData.title,
          excerpt: formData.excerpt,
          category: formData.category,
          read_time: formData.read_time || null,
          cover: formData.cover || null, // Cloudinary URL
        },
        { withCredentials: true }
      );

      // Get blog ID from response or generate fallback
      console.log(response)
      const blogId = response.data.blog?._id || Date.now().toString();

      // Navigate to next step (blog content creation)
      navigate(`/blogs/create/${blogId}`);
    } catch (err) {
      console.error("Error creating blog metadata:", err);
      toast.error("Failed to create blog. Please try again."); // optional
    } finally {
      setLoading(false);
    }
  };

  const slides = [
    <div className="p-2">
      <label className="block text-sm font-medium mb-1 text-gray-800">Title *</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter blog title"
        className={`w-[98%] border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 text-gray-800 placeholder-gray-400 ${errors.title ? "border-red-500 ring-red-500" : "border-gray-300 ring-blue-500"
          }`}
      />
      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
    </div>,
    <div className="w-full p-2">
      <label className="block text-sm font-medium mb-1 text-gray-800">Excerpt *</label>
      <textarea
        name="excerpt"
        value={formData.excerpt}
        onChange={handleChange}
        placeholder="Write a short summary"
        className={`w-[98%] border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 text-gray-800 placeholder-gray-400 ${errors.excerpt ? "border-red-500 ring-red-500" : "border-gray-300 ring-blue-500"
          }`}
        rows={4}
      />
      {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
    </div>,
    <div className="p-3">
      <label className="block text-sm font-medium mb-1 text-gray-800">Category *</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Enter blog category"
        className={`w-[98%] border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 text-gray-800 placeholder-gray-400 ${errors.category ? "border-red-500 ring-red-500" : "border-gray-300 ring-blue-500"
          }`}
      />
      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}

      <label className="block text-sm font-medium mt-4 mb-1 text-gray-800">Read Time</label>
      <input
        type="text"
        name="read_time"
        value={formData.read_time}
        onChange={handleChange}
        placeholder="e.g. 5 min"
        className="w-[98%] border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 text-gray-800 placeholder-gray-400"
      />


    </div>,
    <div key="imageUploader" className="p-2 w-full flex-shrink-0 min-h-[300px]">
      <ImageUploader
        theme="light"
        uploadUrl={`${baseUrl}/gallery/uploadImg`}
        onUpload={(url) => setFormData(prev => ({ ...prev, cover: url }))}
      />
    </div>
  ];


  console.log(slides.length)
  console.log(currentStep)


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center poppins-regular bg-black bg-opacity-50">
      <div className="bg-white text-gray-800 rounded-lg w-full max-w-2xl p-6 relative shadow-xl transition-all duration-300 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl poppins-regular mb-4 text-gray-900">Create New Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-[50vw] min-w-[300px] overflow-hidden  relative">
          <div
            className="flex transition-transform justify-between duration-500   w-[100%] "
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full   flex-shrink-0  ">
                {slide}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Back
              </button>
            )}
            {currentStep < (slides.length - 1) ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-green-600 text-white flex items-center gap-2 hover:bg-green-500"
              >
                <Check size={16} /> {loading ? "Creating..." : "Create Blog"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
