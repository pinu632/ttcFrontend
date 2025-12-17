import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
    { title: "Careers", description: "Guides, internships, and job tips for CS students", img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755742597/pexels-divinetechygirl-1181677_aexljl.jpg" },
    { title: "Latest Tech", description: "Stay updated with cutting-edge technology trends", img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755742615/person-using-ar-technology-their-daily-occupation_o3rbwv.jpg" },
    { title: "AI & ML", description: "Explore Artificial Intelligence and Machine Learning concepts", img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755742646/futuristic-ai-chip-circuit-board_istqgu.jpg" },
    { title: "Stories", description: "Inspiring stories from tech enthusiasts and developers", img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755742597/pexels-magda-ehlers-pexels-1054713_qrcznc.jpg" },
    { title: "Adventure", description: "Outdoor and adventurous activities to refresh your mind", img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755742641/young-hiker-with-backpack-surrounded-by-mountains-cloudy-sky-cantabria-spain_raobdi.jpg" },
    { title: "Projects", description: "Ideas and guidance to build impactful projects", img: "/projects.jpg" },
];

export default function CategoryCarousel() {
    const carouselRef = useRef(null);

    const scroll = (direction:any) => {
        if (carouselRef.current) {
            //@ts-ignore
            const scrollAmount = carouselRef.current.firstChild.offsetWidth + 16; // tile width + gap
            //@ts-ignore
            carouselRef.current.scrollBy({
                left: direction === "right" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative w-full mt-3">
            <div className="w-full flex items-center justify-between mb-4 px-6 py-1">
                <h2 className="text-2xl font-bold poppins-bold mb-4 text-gray-900">Article Categories</h2>
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition z-10"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Right Button */}
                    <button
                        onClick={() => scroll("right")}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition z-10"
                    >
                        <ChevronRight size={24} />
                    </button>

                </div>
            </div>
            <div className="flex items-center">
                {/* Left Button */}


                {/* Carousel */}
                <div
                    ref={carouselRef}
                    className="flex overflow-x-auto scroll-smooth no-scrollbar px-2"
                >
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="min-w-[250px] max-w-[350px] md:min-w-[350px] min-h-[400px] bg-gray-100  ml-3 overflow-hidden relative flex-shrink-0"
                            onClick={() => window.location.href = `/blogs/category/${cat.title.toLowerCase().replace(/ /g, "-")}`}
                        >
                            <img src={cat.img} alt={cat.title} className="w-full h-[400px] object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/10 backdrop-blur-lg text-white p-4">
                                <h3 className=" poppins-light text-2xl">{cat.title}</h3>
                                <p className="text-xs leading-[1.1] poppins-light">{cat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}
