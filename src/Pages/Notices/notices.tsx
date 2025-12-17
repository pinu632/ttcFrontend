import { useState } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function NoticePage() {
    const filters = ["All", "Important", "Events", "Updates"]
    const [activeFilter, setActiveFilter] = useState("All")

    const notices = [
        {
            title: "Expert Talk on Machine Learning",
            category: "Events",
            date: "2025-03-15",
            description:
                "Join us for an insightful expert session on Machine Learning fundamentals and industry applications.",
        },
        {
            title: "Code Wars Round 2 Results",
            category: "Important",
            date: "2025-03-12",
            description:
                "Results for Code Wars Round 2 are out! Congratulations to all the winners and participants.",
        },
        {
            title: "Treasure Hunt Registration Open",
            category: "Events",
            date: "2025-03-10",
            description:
                "Registrations are now open for the Non-Tech Treasure Hunt event happening this weekend.",
        },
        {
            title: "Club Orientation for New Members",
            category: "Updates",
            date: "2025-03-08",
            description:
                "New members are requested to attend the TTC orientation session to understand club activities and processes.",
        },
    ]

    const filtered = activeFilter === "All"
        ? notices
        : notices.filter((n) => n.category === activeFilter)

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 space-y-12 h-full flex flex-col">

                {/* BREADCRUMB */}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Notices</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* PAGE HEADER */}
                <div className="space-y-3">
                    <h1 className="text-4xl md:text-[10vw] font-semibold text-foreground">
                        Notices
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Stay updated with key announcements, important dates, and upcoming events from the Tech Talk Club.
                    </p>
                </div>

                {/* FILTERS */}
                <div className="flex gap-3 flex-wrap">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm border transition",
                                activeFilter === f
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "border-border text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* NOTICE LIST — SCROLLABLE */}
                <div className="flex-1  pr-2 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
                        {filtered.map((n, i) => (
                            <Card
                                key={i}
                                className="border border-border hover:border-primary transition rounded-2xl bg-card"
                            >
                                <CardHeader className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl font-semibold text-foreground">
                                            {n.title}
                                        </CardTitle>
                                        <Badge variant="secondary" className="text-xs px-3 py-1">
                                            {n.category}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-muted-foreground">
                                        {new Date(n.date).toLocaleDateString("en-IN", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {n.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </section>

    )
}
