"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/Axios/axiosInstance";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Eye, Clock, ArrowRight, BookOpen } from "lucide-react";

// --- Interfaces ---
interface Author {
  _id: string;
  name: string;
  profilePic?: string;
}

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  cover?: string;
  category: string;
  read_time?: string;
  views?: number;
  author: Author;
}

export default function PopularBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        // Take only top 3 for the "Popular" section
        setBlogs(res.data?.data?.slice(0, 3) || []);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="w-full sm:py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Popular Blogs
            </h2>
            <p className="text-muted-foreground text-lg">
              Read what everyone is loving right now.
            </p>
          </div>
          
          <Link to="/blogs">
            <Button 
              variant="outline" 
              className="group rounded-full px-6 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
            >
              View all stories
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Dynamic Grid Logic: Centers 1 or 2 blogs so they don't look "lost" */}
        <div 
          className={`grid gap-8 justify-center ${
            blogs.length === 1 ? "max-w-md mx-auto grid-cols-1" : 
            blogs.length === 2 ? "max-w-4xl mx-auto grid-cols-1 sm:grid-cols-2" : 
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <BlogSkeleton key={i} />)
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <Link key={blog._id} to={`/blogs/${blog._id}`} className="group block h-full">
                <Card className="h-full flex flex-col border-border/60 bg-card transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 overflow-hidden">
                  
                  {/* Professional Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {blog.cover ? (
                      <img 
                        src={blog.cover} 
                        alt={blog.title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="h-full w-full bg-secondary/30 flex items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    <Badge className="absolute top-4 left-4 bg-background/90 backdrop-blur-md text-foreground" variant="outline">
                      {blog.category}
                    </Badge>
                  </div>

                  <CardHeader className="pt-6">
                    <CardTitle className="line-clamp-2 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="mt-auto pt-4 pb-6 flex items-center justify-between border-t border-border/40">
                    <div className="flex items-center gap-2.5">
                       <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden ring-1 ring-border">
                          {blog.author?.profilePic ? (
                            <img src={blog.author.profilePic} className="object-cover h-full w-full" alt={blog.author.name} />
                          ) : (
                            <span className="text-xs font-bold text-primary">{blog.author?.name?.charAt(0)}</span>
                          )}
                       </div>
                       <span className="text-xs font-semibold text-foreground/80">{blog.author?.name}</span>
                    </div>
                    <div className="flex gap-4 text-muted-foreground/70">
                       <span className="flex items-center text-[11px] font-medium gap-1.5">
                         <Clock className="w-3.5 h-3.5 text-primary/60"/> 
                         {blog.read_time || "5 min"}
                       </span>
                       <span className="flex items-center text-[11px] font-medium gap-1.5">
                         <Eye className="w-3.5 h-3.5 text-primary/60"/> 
                         {blog.views || 0}
                       </span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            /* Empty State */
            <div className="col-span-full py-24 text-center flex flex-col items-center justify-center border-2 border-dashed border-border/60 rounded-3xl bg-muted/20">
              <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center shadow-sm mb-4">
                <BookOpen className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <h3 className="text-xl font-semibold">No popular blogs yet</h3>
              <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
                Check back soon to see the latest trending stories from our contributors.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Professional Skeleton Loader
 */
function BlogSkeleton() {
  return (
    <Card className="overflow-hidden border-border/50 h-full">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
        <div className="pt-6 flex items-center justify-between border-t border-border/40">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </Card>
  );
}