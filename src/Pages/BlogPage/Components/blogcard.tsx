// components/BlogCard.jsx
import { Heart } from "lucide-react";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white shadow sm:shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition cursor-pointer">
      {/* Image with badge */}
      <div className="relative">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded-full">
          ⏱ {blog.readTime} min read
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Categories */}
        <p className="text-red-600 text-xs font-semibold uppercase mb-2">
          {blog.categories.join(" • ")}
        </p>

        {/* Title */}
        <h2 className="text-lg font-bold text-black mb-2">
          {blog.title}
        </h2>

        {/* Author + Stats */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{blog.author}</span>
          <span>{blog.date}</span>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
          <span>{blog.views} views</span>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span>{blog.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
