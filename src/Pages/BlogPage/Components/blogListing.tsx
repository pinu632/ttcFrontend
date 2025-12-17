// pages/BlogListing.jsx
import { useState, useEffect } from "react";
import BlogCard from "./blogcard";
import Breadcrumb from "../../../Component/Breadcrumb/breadcrumb";
import { Search, Filter } from "lucide-react";
import { useParams } from "react-router-dom";
import BlogFilterBar from "./filterSearchBar";

const blogsData = [
    {
        id: 1,
        title: "AI Revolution in 2025",
        image: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755748205/AI-Reshaping-the-Job-Market_xcoj1e.webp",
        author: "John Doe",
        readTime: 4,
        categories: ["Programming", "AI"],
        views: 120,
        likes: 35,
        date: "2 days ago",
    },
    {
        id: 2,
        title: "Quantum Computing Explained",
        image: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755748206/shutterstock_2504709421_dlz6qt.jpg",
        author: "Jane Smith",
        readTime: 6,
        categories: ["Programming", "Quantum"],
        views: 90,
        likes: 20,
        date: "5 days ago",
    },
    {
        id: 3,
        title: "Web3 and the Future of Internet",
        image: "https://blog.whitebit.com/wp-content/uploads/2024/08/blog-post-eng-4-1024x576.png",
        author: "Mark Lee",
        readTime: 5,
        categories: ["Web Development", "Blockchain"],
        views: 150,
        likes: 42,
        date: "1 week ago",
    },
];

const categoryTopicsMap = {
    "careers": ["Internships", "Job Tips", "Resume Building", "Interview Prep"],
    "latest-tech": ["AI", "Blockchain", "Robotics", "Quantum Computing", "Cybersecurity", "Quantum"],
    "ai-ml": ["Deep Learning", "NLP", "Computer Vision", "Reinforcement Learning"],
    "stories": ["Student Journeys", "Tech Adventures", "Startup Stories"],
    "adventure": ["Hackathons", "Competitions", "Coding Challenges"],
    "programming": ["JavaScript", "Python", "Java", "C++", "Go"],
};


export default function BlogListing() {
    const [search, setSearch] = useState("");



    const { category } = useParams(); // 👈 get the param
    console.log("Category:", category);
    const [blogs, setBlogs] = useState([]);
    // let filteredBlogs = []

    useEffect(() => {
        // get the topics that belong to the category from the map
        const topics = categoryTopicsMap[category] || [category];

        const filteredBlogs = blogsData.filter(
            (blog) =>
                blog.categories.some((c) =>
                    topics.map((t) => t.toLowerCase()).includes(c.toLowerCase())
                ) &&
                blog.title.toLowerCase().includes(search.toLowerCase())
        );

        setBlogs(filteredBlogs);
    }, [category, search]);


    console.log(blogs)
    return (
        <div className="bg-white min-h-screen text-black px-5 pb-10 sm:px-10 md:px-16 lg:px-20 poppins-light">
            {/* Header */}
            <div className="sm:px-6 py-5 sm:py-6">
                <h1 className="text-3xl font-bold ">Tech Talk Blog</h1>
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Blog", href: "/blogs" },
                        { label: category, href: `/blog/category/${category}` },

                    ]}
                />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 ">
                <BlogFilterBar />
            </div>

            {/* Blog Grid */}
            {/* Blog Grid */}
            <div className="sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.length > 0 ? (
                    blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
                ) : (
                    <div className="col-span-full text-center py-[130px] sm:py-[100px] poppins-light rounded-2xl ">
                        <h2 className="text-md font-semibold text-gray-600 mb-2">
                            Sorry, there are no articles yet!
                        </h2>
                        <p className="text-gray-600 text-sm max-w-xl mx-auto">
                            You can be our writer ✍️. <br /> Write your piece and send it to{" "}
                            <a
                                href="mailto:techtalkclubggi@gmail.com"
                                className="text-black/60 font-medium "
                            >
                                techtalkclubggi@gmail.com
                            </a>
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
}
