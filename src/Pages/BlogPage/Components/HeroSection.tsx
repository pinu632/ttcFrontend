import { Pen } from "lucide-react";
import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

// Sample top articles data
const topArticles = [
  {
    id: 1,
    title: "Conquer the wild: \n Exploring terrains and conquering nature",
    topic: "Adventure",
    summary: "Discover the most thrilling adventures and terrains you can explore this year.",
    author: "John Doe",
    readTime: "5 min",
    image: "https://res.cloudinary.com/dxgcq5wuz/image/upload/c_crop,ar_16:9/v1755706363/pexels-moklebust-33515293_uxi6nv.jpg",
  },
  {
    id: 2,
    title: "Career growth hacks for tech enthusiasts",
    topic: "Career",
    summary: "Maximize your career potential with these actionable tech career tips.",
    author: "Jane Smith",
    readTime: "4 min",
    image: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755706362/pexels-cottonbro-5474300_b6cn5a.jpg",
  },
  {
    id: 3,
    title: "AI in everyday life: The tech behind the scenes",
    topic: "Tech Affairs",
    summary: "Explore how AI is revolutionizing daily activities and businesses globally.",
    author: "Alice Johnson",
    readTime: "6 min",
    image: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755742646/futuristic-ai-chip-circuit-board_istqgu.jpg",
  },
  {
    id: 4,
    title: "Fun side projects to boost your portfolio",
    topic: "Fun",
    summary: "Creative and fun projects to showcase your skills and impress recruiters.",
    author: "Bob Williams",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1572177812156-58036aae439c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvamVjdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 5,
    title: "Mastering React in 2025: Tips and Tricks",
    topic: "Tech",
    summary: "Learn advanced React techniques to build dynamic web applications.",
    author: "Sara Lee",
    readTime: "7 min",
    image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fjn2f3hfh766xf2u86z09.jpg",
  },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % topArticles.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + topArticles.length) % topArticles.length);
  };

  const activeArticle = topArticles[activeIndex];

  return (
    <div className="relative w-full poppins-light min-h-[80vh] max-h-[80vh] overflow-hidden z-10 p-3 ">
      {/* Background Image */}
    
      <img
        src={activeArticle.image}
        alt={activeArticle.title}
        className=" absolute inset-0 w-full h-full object-cover  brightness-50  transition duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 bg-opacity-40 flex flex-col justify-center px-5 md:px-16 text-white">
        <span className="bg-white/10 backdrop-blur-lg px-3 py-1 rounded-full text-sm w-max ">
          {activeArticle.topic}
        </span>
        <h1 className="text-[7vw] md:text-5xl leading-[1.2] max-w-6xl sm:max-w-5xl font-bold mt-3 poppins-regular">
          {activeArticle.title.split(':').map((data, index, arr) => (
            <span key={index} className="block">
              {data.trim()}
              {index < arr.length - 1 ? ':' : ''} {/* add ':' back except for last segment */}
            </span>
          ))}
        </h1>

        <p className="mt-2 md:mt-4 text-sm md:text-base max-w-xl">{activeArticle.summary}</p>
        <div className="mt-3 flex items-center font-bold gap-4 text-xs md:text-sm">
          <span className="flex justify-center gap-0.5 items-center"><Pen className="" size={12}/> {activeArticle.author}</span>
          <span>•</span>
          <span>{activeArticle.readTime} read</span>
        </div>
        <button
          className=" flex justify-center items-center gap-1 mt-4 max-w-[160px] md:mt-6 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm  rounded-full transition"
        >
          Read More
          <ArrowUpRight />
        </button>

        {/* Navigation Buttons */}
        <div className="absolute bottom-4 right-6 flex gap-2">
          <button
            onClick={handlePrev}
            className="bg-white/10 text-white text-sm px-4 py-1 rounded-full hover:bg-gray-200/30 transition"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="bg-white/10 text-white text-sm px-4 py-1 rounded-full hover:bg-gray-200/30 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
