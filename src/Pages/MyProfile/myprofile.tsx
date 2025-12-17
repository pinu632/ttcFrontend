"use client";

import { useState, } from "react";
import { useForm } from "react-hook-form";
import { 
  User, Mail, Phone, BookOpen, Award, 
  Trophy, Download, Github, Share2, 
   CheckCircle2, Pencil, Plus 
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/store/hook";

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useAppSelector(s => s.auth.user);

  // Initial Demo Data (Replace with API call in useEffect)
  const userData = {
    name: user?.name || "",
    email: user?.email || "",
    rollNo: user?.rollNo || "",
    phone: user?.phone || "9693135466",
    course: user?.course || "B.Tech CSE",
    semester: user?.semester || 8,
    rank: user?.rank || 12,
    totalPoints: user?.totalPoints || 1450,
    profilePic: user?.profilePic || "",
    roles: user?.role || ["student"],
  };

  const form = useForm({ defaultValues: userData });

  const onUpdateProfile = async (data: any) => {
    data;
    setLoading(true);
    try {
      // await api.put("/user/update", data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 space-y-8">
      
      {/* Header Profile Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 bg-card p-8 rounded-3xl border border-border/60 shadow-sm">
        <div className="relative group">
          <Avatar className="h-32 w-32 ring-4 ring-primary/10">
            <AvatarImage src={userData.profilePic} />
            <AvatarFallback className="text-3xl">PA</AvatarFallback>
          </Avatar>
          <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full shadow-lg border border-border">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h1 className="text-3xl font-bold">{userData.name}</h1>
            <div className="flex gap-2 justify-center">
                
              {userData.roles.map(
                //@ts-ignore
                role => (
                <Badge key={role} variant="secondary" className="bg-primary/10 text-primary border-none">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground font-medium">{userData.course} • Semester {userData.semester}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1 rounded-full border">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="font-bold">Rank #{userData.rank}</span>
            </div>
            <div className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1 rounded-full border">
              <Award className="h-4 w-4 text-primary" />
              <span className="font-bold">{userData.totalPoints} Points</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "destructive" : "outline"} className="rounded-xl">
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
          <Button className="rounded-xl px-6 shadow-lg shadow-primary/20">Share Profile</Button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details & Stats */}
        <div className="space-y-8">
          <Card className="rounded-2xl border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoRow icon={Mail} label="Email" value={userData.email} isEditing={isEditing} />
              <InfoRow icon={Phone} label="Phone" value={userData.phone} isEditing={isEditing} />
              <InfoRow icon={BookOpen} label="Roll Number" value={userData.rollNo} />
              {isEditing && (
                <Button className="w-full mt-4" onClick={form.handleSubmit(onUpdateProfile)} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-primary text-primary-foreground border-none overflow-hidden relative">
             <CardContent className="p-6 space-y-4 relative z-10">
                <h3 className="font-bold flex items-center gap-2">Leaderboard Standing</h3>
                <div className="text-4xl font-black">Top 5%</div>
                <p className="text-primary-foreground/80 text-sm">You are 250 points away from reaching Rank #10.</p>
                <Progress value={75} className="bg-white/20" />
             </CardContent>
             <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
                <Trophy size={120} />
             </div>
          </Card>
        </div>

        {/* Right Column: Activities, Events, Projects */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="w-full justify-start h-12 bg-muted/50 p-1 mb-6 rounded-xl border border-border/40">
              <TabsTrigger value="events" className="rounded-lg px-6">Event Participation</TabsTrigger>
              <TabsTrigger value="projects" className="rounded-lg px-6">My Projects</TabsTrigger>
              <TabsTrigger value="activities" className="rounded-lg px-6">Activity Log</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-4">
              <EventItem 
                name="Code Sprint Showdown" 
                date="16 Dec 2025" 
                score={85} 
                rank={4} 
                certificate={true} 
              />
              <EventItem 
                name="Debug the Gesture" 
                date="03 Mar 2025" 
                score={92} 
                rank={1} 
                certificate={true} 
              />
            </TabsContent>

            <TabsContent value="projects">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProjectCard 
                  title="TechTalk Mobile App" 
                  desc="A React Native app for event registrations." 
                  tech={["React", "Firebase"]} 
                />
                <div className="border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 text-muted-foreground hover:bg-muted/30 cursor-pointer transition-all">
                   <Plus className="h-8 w-8 mb-2" />
                   <p className="font-semibold">Add New Project</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// --- Helper Sub-Components ---

function InfoRow({ icon: Icon, label, value, isEditing }: any) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
        <Icon className="h-3 w-3" /> {label}
      </div>
      {isEditing ? (
        <Input defaultValue={value} className="h-9 focus-visible:ring-primary" />
      ) : (
        <div className="text-sm font-medium">{value}</div>
      )}
    </div>
  );
}

function EventItem({ name, date, score, rank, certificate }: any) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-card border border-border/60 rounded-2xl hover:border-primary/40 transition-all group">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <CheckCircle2 />
        </div>
        <div>
          <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{name}</h4>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-6 mt-4 md:mt-0">
        <div className="text-center">
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Score</p>
          <p className="font-bold">{score}/100</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Rank</p>
          <p className="font-bold text-primary">#{rank}</p>
        </div>
        {certificate && (
          <Button size="sm" variant="ghost" className="rounded-lg gap-2 text-primary">
            <Download size={14} /> <span className="hidden sm:inline">Certificate</span>
          </Button>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ title, desc, tech }: any) {
  return (
    <Card className="rounded-2xl border-border/60 overflow-hidden group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base group-hover:text-primary transition-colors">{title}</CardTitle>
          <div className="flex gap-2">
            <Github className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
            <Share2 className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
          </div>
        </div>
        <CardDescription className="text-xs leading-relaxed">{desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        {tech.map((t: string) => (
          <Badge key={t} variant="outline" className="text-[10px] px-2 py-0">{t}</Badge>
        ))}
      </CardContent>
    </Card>
  );
}