import { useEffect, useState, useRef, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import api from "@/Axios/axiosInstance";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function GalleryPage() {
    const [images, setImages] = useState<any[]>([]);
    const [pageNum, setPageNum] = useState(1);
    const [selectedImg, setSelectedImg] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const pageSize = 20;
    const loaderRef = useRef<HTMLDivElement | null>(null);

    // ------------------ Fetch Images ------------------
    const fetchImages = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const res = await api.post(`/media/list`, {
                pageNum,
                pageSize,
            });

            const data = res.data;

            if (!data?.data?.length) {
                setHasMore(false);
                return;
            }

            setImages((prev) => [...prev, ...data.data]);
            setPageNum((prev) => prev + 1);
        } catch (error) {
            console.error("Failed to fetch images", error);
        } finally {
            setLoading(false);
        }
    }, [pageNum, hasMore, loading]);

    // ------------------ Infinite Scroll ------------------
    useEffect(() => {
        const obs = new IntersectionObserver(
            (e) => {
                if (e[0].isIntersecting) fetchImages();
            },
            { threshold: 1 }
        );

        if (loaderRef.current) obs.observe(loaderRef.current);
        return () => obs.disconnect();
    }, [fetchImages]);

    // ------------------ Masonry Row Span Calculator ------------------
    const calcSpan = (img: any) => {
        if (!img?.metadata?.width || !img.metadata?.height) return 20; // fallback
        const aspectRatio = img?.metadata?.height / img?.metadata?.width;
        return Math.ceil(aspectRatio * 20); // 20 = base row height
    };

    return (
        <div className="min-h-screen bg-background text-foreground px-4 py-10">
            <div className="max-w-7xl mx-auto">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink href="/gallery" className="font-medium">
                                Gallery
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <h1 className="text-[10vw] font-bold text-left mb-8"> Gallery</h1>
                {/* -------------------- Search + Filters -------------------- */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">

                    {/* Search Bar */}
                    <div className="relative w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Search images..."
                            className="w-full px-4 py-2 pl-10 rounded-md border bg-card text-foreground"
                            onChange={(e) => console.log("search:", e.target.value)}
                        />
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3">
                        {["All", "Events", "Workshops", "People", "Campus"].map((f) => (
                            <button
                                key={f}
                                onClick={() => console.log("filter:", f)}
                                className="px-4 py-2 border rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition"
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>


                {/* -------------------- Masonry Grid -------------------- */}
                <div
                    className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-4
          "
                >
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className="relative cursor-pointer"
                            style={{
                                gridRowEnd: `span ${calcSpan(img)}`,
                            }}
                            onClick={() => setSelectedImg(img)}
                        >
                            <img
                                src={img.url}
                                alt=""
                                className="w-full h-auto object-contain  shadow-sm"
                            />
                        </div>
                    ))}
                </div>

                {/* Loading */}
                {loading && (
                    <p className="text-center mt-4 text-muted-foreground">Loading…</p>
                )}

                <div ref={loaderRef} className="h-10"></div>

                {!hasMore && (
                    <p className="text-center mt-4 text-muted-foreground">
                        All images loaded.
                    </p>
                )}
            </div>

            {/* -------------------- Image Viewer Modal -------------------- */}
            <Dialog open={!!selectedImg} onOpenChange={() => setSelectedImg(null)}>
                <DialogContent className="max-w-fit h-full p-0 bg-black/90 border-none flex items-center justify-center">


                    {selectedImg && (
                        <img
                            src={selectedImg.url}
                            className="max-w-[95vw] max-height-[95vh] object-contain rounded-lg"
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
