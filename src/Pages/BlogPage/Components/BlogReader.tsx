import { Facebook, Twitter, Linkedin, Share2, Moon, Sun } from "lucide-react";
import { useEffect, useMemo, useState, type JSX } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import api from "@/Axios/axiosInstance";



// -------------------- Types --------------------
interface BlogArticle {
    _id: string;
    title: string;
    excerpt: string;
    category: string;
    content: string;
    cover?: string;
    read_time?: string;
    created_at: string;
    views?: number;
    author_name: string;
    author_profile_image?: string;
    suggested?: string[];
}

// -------------------- Helpers --------------------
function getH3Subtopics(htmlString?: string): string[] {
    if (!htmlString) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return Array.from(doc.querySelectorAll("h3")).map(
        (el) => el.textContent || ""
    );
}

function stripInlineStyles(htmlString?: string): string {
    if (!htmlString) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    doc.querySelectorAll("[style]").forEach((el) => el.removeAttribute("style"));
    return doc.body.innerHTML;
}

// -------------------- Component --------------------
export default function BlogReadingPage(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<BlogArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await api.get(`/blogs/${id}`);
                setArticle(res.data.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchArticle();
    }, [id]);

    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
        setIsDark((p) => !p);
    };

    const styledContent = useMemo(() => {
        if (!article?.content) return "";

        return stripInlineStyles(article.content)
            .replaceAll(
                "<h2>",
                '<h2 class="mt-12 mb-4 text-3xl font-semibold tracking-tight text-foreground">'
            )
            .replaceAll(
                "<h3>",
                '<h3 class="mt-8 mb-3 text-2xl font-medium text-foreground">'
            )
            .replaceAll(
                "<p>",
                '<p class="mt-4 leading-7 text-muted-foreground">'
            )
            .replaceAll(
                "<ul>",
                '<ul class="mt-4 ml-6 list-disc space-y-2 text-muted-foreground">'
            )
            .replaceAll(
                "<ol>",
                '<ol class="mt-4 ml-6 list-decimal space-y-2 text-muted-foreground">'
            )
            .replaceAll(
                "<a",
                '<a class="text-primary font-medium underline underline-offset-4 hover:opacity-80"'
            )
            .replaceAll(
                "<img",
                '<img class="my-10 w-full rounded-2xl shadow-md"'
            );
    }, [article]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center text-muted-foreground">
                Loading article…
            </div>
        );
    }

    if (!article) {
        return (
            <div className="flex min-h-screen items-center justify-center text-destructive">
                Article not found
            </div>
        );
    }

    return (
        <div className="bg-background text-foreground">
            {/* Top Bar */}
            <header className="border-b">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                    <h3
                    onClick={()=>{
                        navigate('/');
                    }}
                     className="text-2xl font-codec font-bold tracking-tight cursor-pointer">
                        TechTalk Club<span className="text-violet-600 text-4xl">.</span>
                    </h3>

                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                </div>
            </header>

            {/* Breadcrumb */}
            <div className="mx-auto max-w-7xl px-6 py-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/blogs">Blog</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>{article.title}</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Hero */}
            <section className="mx-auto max-w-7xl px-6 pt-6">
                <h1 className="text-4xl font-bold leading-tight tracking-tight">
                    {article.title}
                </h1>

                <p className="mt-4 text-lg text-muted-foreground">
                    {article.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                        {article.author_name}
                    </span>
                    <span>•</span>
                    <span>{new Date(article.created_at).toDateString()}</span>
                    {article.read_time && (
                        <>
                            <span>•</span>
                            <span>{article.read_time}</span>
                        </>
                    )}
                </div>

                {article.cover && (
                    <img
                        src={article.cover}
                        alt={article.title}
                        className="mt-10 max-h-[420px] w-full rounded-3xl object-cover shadow-xl"
                    />
                )}
            </section>

            {/* Main Layout */}
            <section className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[220px_1fr_220px]">
                {/* TOC */}
                <aside className="sticky top-24 hidden h-fit space-y-4 lg:block">
                    <h4 className="text-sm font-semibold text-foreground">
                        On this page
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {getH3Subtopics(article.content).map((t, i) => (
                            <li key={i} className="hover:text-foreground cursor-pointer">
                                {t}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Content */}
                <main>
                    <article
                        className="prose max-w-none prose-neutral dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: styledContent }}
                    />
                </main>

                {/* Share */}
                <aside className="sticky top-24 h-fit space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Share</CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-4">
                            <Facebook className="cursor-pointer hover:text-primary" />
                            <Twitter className="cursor-pointer hover:text-primary" />
                            <Linkedin className="cursor-pointer hover:text-primary" />
                            <Share2 className="cursor-pointer hover:text-primary" />
                        </CardContent>
                    </Card>
                </aside>
            </section>

            <div className="h-24" />
        </div>
    );
}
