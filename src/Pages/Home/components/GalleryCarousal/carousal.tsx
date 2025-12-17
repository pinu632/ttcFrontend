"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const galleryData = [
  {
    id: 17,
    image_url:
      "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1748420985/TechTalkWebsite/eventphotos/hsppyd1rlh2taigikhcd.jpg",
    title: "Snake and Ladder ",
    description: "Fun quiz game based on movie knowledge",
  },
  {
    id: 2,
    image_url:
      "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1741805876/TechTalkWebsite/TTC%20Gallery/IMG-20250311-WA0042_zch2ma.jpg",
    title: "Coordinators Debate",
    description: "Coordinators of CodeCanvas & Techno Tussle",
  },
  {
    id: 7,
    image_url:
      "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1743014591/TechTalkWebsite/lesasydpp2irlnwwtvh5.jpg",
    title: "Techno Tussle",
    description: "Debate Competition",
  },
  {
    id: 1,
    image_url:
      "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1741806015/TechTalkWebsite/TTC%20Gallery/IMG-20250311-WA0102_dmtgje.jpg",
    title: "Techno Tussle — Image 2",
    description: "Event image",
  },
  {
    id: 5,
    image_url:
      "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1741857123/TechTalkWebsite/TTC%20Gallery/IMG-20250313-WA0003_rvsdxe.jpg",
    title: "Fellow Mentoring",
    description: "Session Moments",
  },
  {
    id: 3,
    image_url:
      "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1741805829/TechTalkWebsite/TTC%20Gallery/IMG-20250311-WA0026_iqgb3n.jpg",
    title: "Web Designing",
    description: "Code Canvas Event",
  },
  {
    id: 4,
    image_url:
      "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1741857144/TechTalkWebsite/TTC%20Gallery/IMG-20250313-WA0015_paoc5v.jpg",
    title: "Fellow Mentoring",
    description: "Session Moments",
  },
  {
    id: 8,
    image_url:
      "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1743014592/TechTalkWebsite/lo8t1pdtixcc8839jlzg.jpg",
    title: "Techno Tussle",
    description: "Debate Competition",
  },
  {
    id: 6,
    image_url:
      "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1741857110/TechTalkWebsite/TTC%20Gallery/IMG-20250218-WA0012_y2qa69.jpg",
    title: "Fellow Mentoring",
    description: "Session Moments",
  },
  {
    id: 18,
    image_url:
      "https://res.cloudinary.com/dxgcq5wuz/image/upload/v1748420987/TechTalkWebsite/eventphotos/y5wy5xswbnopol1wbz0r.jpg",
    title: "Snake and Ladder",
    description: "Fun movie-based quiz",
  },
];

export default function GalleryCarousel() {
  return (
    <div className="px-2 sm:px-0 w-full flex justify-center py-6 sm:py-10">
      <Carousel
        className="
              w-full max-w-sm
              sm:max-w-5xl 
              sm:w-full 
              sm:min-h-[60vh]
              relative
            "
      >
        <CarouselContent>
          {galleryData.map((item) => (
            <CarouselItem key={item.id} className="sm:flex justify-center gap-4 ">
              <Card className="hidden sm:flex justify-center items-center border-none shadow-none bg-transparent">
                <div className="mt-3 text-center flex flex-col items-center justify-center">
                  <h3 className=" w-full text-2xl font-semibold sm:text-6xl max-w-sm text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Card>
              <Card className="overflow-hidden rounded-xl border-none shadow-none bg-transparent">
                <CardContent className="p-0 mx-auto w-[90vw] sm:w-auto border-none shadow-none">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-[30vh] sm:h-[60vh] object-contain"
                  />
                </CardContent>
              </Card>

              <Card className="flex sm:hidden justify-center pt-2 items-center border-none shadow-none bg-transparent">
                <div className="mt-3 text-center flex flex-col items-center justify-center">
                  <h3 className=" w-full text-2xl font-semibold sm:text-6xl max-w-sm text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Desktop arrows (left & right) */}
        <CarouselPrevious
          size="lg"
          variant="default"
          className="hidden sm:flex"
        />
        <CarouselNext size="lg" variant="default" className="hidden sm:flex" />

        {/* Mobile arrows at the bottom */}
        <div className="sm:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex w-full justify-between px-5">
          <CarouselPrevious
            size="sm"
            variant="default"
            className="relative static translate-x-0 translate-y-0"
          />
          <CarouselNext
            size="sm"
            variant="default"
            className="relative static translate-x-0 translate-y-0"
          />
        </div>
      </Carousel>
    </div>
  );
}
