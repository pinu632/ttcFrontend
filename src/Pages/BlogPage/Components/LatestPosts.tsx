import { Clock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LatestPosts = () => {
  const posts = [
    {
      title: "AI is reshaping the future of work",
      category: "Artificial Intelligence",
      subCategory: "Tech",
      time: "3 min read",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      author: "Tech Talk Club",
      date: "1 day ago",
      views: 120,
    },
    {
      title: "Quantum computing explained simply",
      category: "Quantum Computing",
      subCategory: "Innovation",
      time: "4 min read",
      img: "https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?w=800&q=80",
      author: "Tech Talk Club",
      date: "2 days ago",
      views: 89,
    },
    {
      title: "Cybersecurity threats to watch in 2025",
      category: "Cybersecurity",
      subCategory: "Security",
      time: "2 min read",
      img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755748207/cybersecurity-data-protection-concept-with-shield-laptop_cbzv43.jpg",
      author: "Tech Talk Club",
      date: "3 days ago",
      views: 64,
    },
    {
      title: "Cloud-native apps: The future of scalable systems",
      category: "Cloud Computing",
      subCategory: "DevOps",
      time: "5 min read",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      author: "Tech Talk Club",
      date: "4 days ago",
      views: 41,
    },
    {
      title: "Next.js vs React: Which one to choose in 2025?",
      category: "Web Development",
      subCategory: "Programming",
      time: "3 min read",
      img: "https://miro.medium.com/1*z-rUawcz-H8L8CpR1Mj4Jg.png",
      author: "Tech Talk Club",
      date: "5 days ago",
      views: 95,
    },
    {
      title: "The rise of humanoid robots in real-world industries",
      category: "Robotics",
      subCategory: "Tech",
      time: "4 min read",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&q=80",
      author: "Tech Talk Club",
      date: "6 days ago",
      views: 110,
    },
  ];

  return (
    <section className="w-full p-6">
      <h2 className="text-xl font-semibold mb-6">Latest Tech Posts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <Card
            key={i}
            className="overflow-hidden rounded-xl transition-shadow hover:shadow-lg cursor-pointer"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={post.img}
                alt={post.title}
                className="h-40 w-full object-cover"
              />
              <div className="absolute top-2 left-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                <Clock className="h-3 w-3" />
                {post.time}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  {post.subCategory}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {post.category}
                </Badge>
              </div>

              <h3 className="text-sm font-semibold leading-snug line-clamp-2 hover:text-primary transition-colors">
                {post.title}
              </h3>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>

              <p className="text-xs text-muted-foreground">
                {post.views} views
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
