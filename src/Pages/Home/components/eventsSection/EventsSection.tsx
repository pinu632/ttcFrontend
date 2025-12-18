"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import api from "@/Axios/axiosInstance";
import { Calendar, Clock, MapPin, ArrowRight, BookOpen, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

interface Event {
  _id: string;
  name: string;
  type: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  poster_link: string;
  venue: string;
  description: string;
}

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const naviagate = useNavigate()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.post("/event/list", {
          filter: {},
          select: "name poster_link description scheduled_date start_time end_time venue type -coordinators",
        });
        setEvents(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (loading || events.length === 0) return;

    let ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".event-card");
      //@ts-ignore
      gsap.fromTo(cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, events]);

  // Helper to format ISO date string
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section ref={sectionRef} className="w-full py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Upcoming <span className="text-primary italic">Events</span>
            </h2>
            <p className="text-muted-foreground text-lg">Experience technology and creativity in action.</p>
          </div>
          <Button variant="outline" className="rounded-full group">
            View Calendar
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Grid Logic for 1, 2, or 3 items */}
        <div className={`grid gap-8 justify-center ${events.length === 1 ? "max-w-md mx-auto grid-cols-1" :
            events.length === 2 ? "max-w-4xl mx-auto grid-cols-1 md:grid-cols-2" :
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <EventSkeleton key={i} />)
          ) : events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className="event-card group bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">

                {/* Poster Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={event.poster_link}
                    alt={event.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <Badge className="absolute top-4 left-4 bg-background/90 backdrop-blur-md" variant="secondary">
                    <Layers className="w-3 h-3 mr-1.5" /> {event.type}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                    {event.name}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      {formatDate(event.scheduled_date)}
                    </div>

                    <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      {event.start_time} - {event.end_time}
                    </div>

                    <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      {event.venue}
                    </div>
                  </div>

                  <div className="pt-6 flex gap-3">

                    <Button
                      onClick={() => {
                        naviagate(`/event/${event._id}`)
                      }}
                      variant="default" className=" font-semibold">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center border-2 border-dashed rounded-3xl">
              <BookOpen className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold">No upcoming events</h3>
              <p className="text-muted-foreground">Stay tuned for future announcements.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EventSkeleton() {
  return (
    <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
        <div className="pt-4 space-y-3">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="pt-4 flex gap-3">
          <Skeleton className="h-10 flex-1 rounded-xl" />
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}