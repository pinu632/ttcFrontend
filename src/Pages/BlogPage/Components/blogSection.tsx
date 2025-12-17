import { Newspaper, TrendingUp } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BlogSection = () => {
  const mainNews = {
    title: "AI is reshaping the future of work",
    category: "Tech",
    time: "3 min read",
    img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755748205/AI-Reshaping-the-Job-Market_xcoj1e.webp",
  };

  const editorsPicks = [
    {
      title: "Quantum computing explained simply",
      category: "Tech",
      time: "4 min read",
      img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755748206/shutterstock_2504709421_dlz6qt.jpg",
    },
    {
      title: "Cybersecurity trends to watch in 2025",
      category: "Security",
      time: "2 min read",
      img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755748207/cybersecurity-data-protection-concept-with-shield-laptop_cbzv43.jpg",
    },
  ];

  const trendingNow = [
    {
      title: "Is AI creativity real or illusion?",
      img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755748970/960x0_atcfzt.jpg",
    },
    {
      title: "SpaceX launches next-gen Starlink satellites",
      img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755748969/SEI_243694815_mvqdqg.webp",
    },
    {
      title: "Future of 6G: Beyond speed",
      img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755748970/6GFinland-featured-image_meac9q.jpg",
    },
    {
      title: "OpenAI unveils new multimodal model",
      img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755748970/May-20-2025-08_50_39-AM_xcdus2.webp",
    },
    {
      title: "Blockchain adoption in enterprises",
      img: "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1755748970/1600X900-How-does-blockchain-work_cprrai.jpg",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 mb-16">
      {/* Editor's Picks */}
      <div className="md:col-span-1 space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Newspaper className="h-5 w-5 text-primary" />
          Editor’s Picks
        </h2>

        {editorsPicks.map((pick, i) => (
          <Card key={i} className="relative overflow-hidden rounded-xl">
            <img
              src={pick.img}
              alt={pick.title}
              className="h-36 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex flex-col justify-end">
              <div className="flex items-center gap-2 text-xs text-white/80 mb-1">
                <span>{pick.time}</span>
                <span>•</span>
                <Badge variant="secondary" className="text-xs">
                  {pick.category}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-white">
                {pick.title}
              </h3>
            </div>
          </Card>
        ))}
      </div>

      {/* Main News */}
      <div className="md:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Main News</h2>

        <Card className="relative h-full overflow-hidden rounded-2xl">
          <img
            src={mainNews.img}
            alt={mainNews.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
            <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
              <span>{mainNews.time}</span>
              <span>•</span>
              <Badge className="bg-primary text-primary-foreground">
                {mainNews.category}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {mainNews.title}
            </h1>
          </div>
        </Card>
      </div>

      {/* Trending Now */}
      <div className="md:col-span-1 space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <TrendingUp className="h-5 w-5 text-primary" />
          Trending Now
        </h2>

        <ul className="space-y-3">
          {trendingNow.map((trend, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted cursor-pointer"
            >
              <img
                src={trend.img}
                alt={trend.title}
                className="h-14 w-14 rounded-md object-cover"
              />
              <p className="text-sm font-medium leading-snug">
                {trend.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BlogSection;
