import { useEffect, useRef, useState } from "react";
import api from "@/Axios/axiosInstance";
import { ChevronLeft, ChevronRight, Linkedin, Github, Mail, Home, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// -------------------- Types --------------------
interface Member {
  _id: string;
  member_id: string;
  student: {
    name: string;
    class: string;
    profilePic: string;
    email?: string;
  };
  skills: string[];
  socials?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export default function TeamPage() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.post('/members/list', {
          populate: {
            path: 'student',
            select: 'name profilePic _id class email'
          }
        });
        setMembers(res.data.data.members);
      } catch (error) {
        console.error('Failed to fetch members', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const child = sliderRef.current.children[index] as HTMLElement;
    child?.scrollIntoView({ behavior: "smooth", inline: "center" });
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="animate-pulse font-medium text-muted-foreground">Loading our innovators...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
        {/* Gradient Blobs */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">

  {/* Top Left */}
  <div className="
    absolute -top-24 -left-24
    h-96 w-96 rounded-full
    bg-purple-500/20
    blur-[140px]
    dark:bg-purple-500/15
  " />

  {/* Top Right */}
  <div className="
    absolute -top-32 -right-24
    h-96 w-96 rounded-full
    bg-pink-500/20
    blur-[140px]
    dark:bg-pink-500/15
  " />

  {/* Bottom Left */}
  <div className="
    absolute -bottom-32 -left-24
    h-96 w-96 rounded-full
    bg-emerald-400/20
    blur-[140px]
    dark:bg-emerald-400/15
  " />

  {/* Bottom Right */}
  <div className="
    absolute -bottom-24 -right-32
    h-96 w-96 rounded-full
    bg-yellow-400/20
    blur-[140px]
    dark:bg-yellow-400/15
  " />

</div>

      {/* 1. TOP NAVIGATION / BREADCRUMBS */}
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-1">
                <Home size={14} /> Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1 font-semibold text-primary">
                <Users size={14} /> Team
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* 2. HERO SCROLL SECTION */}
      <section className="relative overflow-hidden pt-10 pb-20">
        {/* Dynamic Background Blurs */}
        {/* <div className="absolute top-0 -left-20 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-0 -right-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" /> */}
        

        <div
          ref={sliderRef}
          className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth no-scrollbar"
        >
          {members.map((m) => (
            <div
              key={m._id}
              className="min-w-full snap-center px-6"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 items-center rounded-3xl border bg-card/50 p-8  md:p-16">
                {/* Left Content */}
                <div className="order-2 md:order-1 space-y-6">
                  <div className="space-y-2">
                    <Badge variant="outline" className="border-primary/50 text-sm text-primary px-3 py-1">
                      Member ID: {m.member_id}
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">
                      {m.student.name}
                    </h1>
                    <p className="text-xl font-medium text-muted-foreground">
                      Class {m.student.class}
                    </p>
                  </div>

                  <p className="text-lg leading-relaxed text-muted-foreground">
                    A dedicated member of the <span className="text-foreground font-semibold">Tech Talk Club</span> specializing in 
                    <span className="text-primary italic"> {m.skills.slice(0, 3).join(", ")}</span> and more.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    {m.student.email && (
                      <Button variant="default" className="rounded-full shadow-lg hover:shadow-primary/20" asChild>
                        <a href={`mailto:${m.student.email}`}>
                          <Mail className="mr-2 h-4 w-4" /> Get in Touch
                        </a>
                      </Button>
                    )}
                    <div className="flex gap-2">
                      {m.socials?.linkedin && (
                        <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-600 hover:text-white transition-colors" asChild>
                          <a href={m.socials.linkedin} target="_blank"><Linkedin size={18} /></a>
                        </Button>
                      )}
                      {m.socials?.github && (
                        <Button variant="outline" size="icon" className="rounded-full hover:bg-zinc-800 hover:text-white transition-colors" asChild>
                          <a href={m.socials.github} target="_blank"><Github size={18} /></a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Image */}
                <div className="order-1 md:order-2 flex justify-center relative">
                    {/* <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary via-purple-500 to-blue-500 opacity-10 blur-xl"></div> */}
                    <img
                      src={m.student.profilePic}
                      alt={m.student.name}
                      className="relative h-[300px] w-[240px] md:h-[450px] md:w-[350px]  object-cover rounded-md "
                    />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Navigation Controls */}
        <div className="mt-8 flex justify-center gap-6">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 border-primary/20 hover:border-primary transition-all"
            onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
            disabled={activeIndex === 0}
          >
            <ChevronLeft />
          </Button>
          <div className="flex items-center gap-2">
              {members.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-primary' : 'w-2 bg-muted'}`} 
                  />
              ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 border-primary/20 hover:border-primary transition-all"
            onClick={() => scrollToIndex(Math.min(activeIndex + 1, members.length - 1))}
            disabled={activeIndex === members.length - 1}
          >
            <ChevronRight />
          </Button>
        </div>
      </section>

      {/* 3. GRID CARDS SECTION */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Meet the Whole Crew</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              The bright minds driving innovation and community at Tech Talk Club.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m) => (
              <Card key={m._id} className="group overflow-hidden border-none bg-card hover:bg-card/80 transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={m.student.profilePic}
                      alt={m.student.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <p className="text-white text-xs font-medium uppercase tracking-widest">View Profile</p>
                    </div>
                  </div>
                  
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{m.student.name}</h3>
                    <p className="mb-4 text-sm font-medium text-muted-foreground">Class {m.student.class}</p>

                    <div className="flex flex-wrap justify-center gap-1.5">
                      {m.skills.slice(0, 3).map(skill => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className="bg-primary/5 text-[10px] font-semibold text-primary hover:bg-primary/10"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}