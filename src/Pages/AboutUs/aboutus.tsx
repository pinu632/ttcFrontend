import AppLayout from "@/Layouts/AppLayout1"
import { SectionSidebar } from "@/Layouts/SectionSidebar"
import KeyActivities from "./sections/keyActivitiesSection"

const sections = [
    { id: "history", label: "History & Vision" },
    { id: "mission", label: "Mission" },
    { id: "activities", label: "Our Activity" },
    { id: "future-vision", label: "Future" }
]

export default function AboutPage() {
    return (
        <AppLayout
            pageTitle="About Us"
            breadcrumbs={[{ label: "About Us" }]}
            sidebar={<SectionSidebar sections={sections} />}
        >
            <div className=" flex-1 overflow-y-auto sm:p-6">

                {/* --- Section 1 --- */}
                <section id="history" className=" py-8 sm:py-20">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* LEFT SIDE — TEXT */}
                        <div>
                            <p className="text-sm tracking-widest font-semibold text-primary mb-2">
                                ABOUT OUR CLUB
                            </p>

                            <h2 className="text-4xl font-light mb-6 text-foreground">
                                History & Vision
                            </h2>

                            <p className="leading-relaxed text-muted-foreground text-lg">
                                The Tech Talk Club was established under the supervision of our Head of
                                Department (HOD), <span className="font-medium text-foreground">Er. Tejinderdeep Singh</span>,
                                at the beginning of 2025. The primary objective of the club is to provide
                                students with a platform to organize and manage events, fostering a
                                collaborative and professional environment.
                            </p>

                            <p className="leading-relaxed text-muted-foreground text-lg mt-4">
                                The club focuses on nurturing technical and leadership skills among
                                students, creating opportunities for them to grow, network, and engage
                                with real-world tech initiatives. Over time, Tech Talk Club has evolved
                                into a vibrant community where learning, innovation, and teamwork thrive.
                            </p>
                        </div>

                        {/* RIGHT SIDE — IMAGE GRID */}
                        <div className="grid grid-cols-2 gap-4">

                            <div className="col-span-2">
                                <img
                                    src="https://res.cloudinary.com/dxgcq5wuz/image/upload/v1741805876/TechTalkWebsite/TTC%20Gallery/IMG-20250311-WA0042_zch2ma.jpg"
                                    alt="Tech Talk Club Event"
                                    className="rounded-xl w-full object-cover shadow-sm"
                                />
                            </div>
                            {/* 
                            <img
                                src="https://res.cloudinary.com/dxgcq5wuz/image/upload/v1741857138/TechTalkWebsite/TTC%20Gallery/IMG-20250313-WA0011_ezd3ib.jpg"
                                alt="Tech Talk Club Auditorium"
                                className="rounded-xl w-full object-cover shadow-sm"
                            />

                            <img
                                src="https://res.cloudinary.com/dxgcq5wuz/image/upload/v1741857134/TechTalkWebsite/TTC%20Gallery/IMG-20250313-WA0007_novsrt.jpg"
                                alt="Tech Talk Club Workshop"
                                className="rounded-xl w-full object-cover shadow-sm"
                            /> */}
                        </div>

                    </div>
                </section>


                {/* --- Section 2 --- */}
                <section id="mission" className="py-16 bg-background">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-4 sm:px-6">

                        {/* LEFT — CIRCULAR IMAGE COLLAGE */}
                        <div className="hidden sm:flex gap-1 mx-auto items-center justify-center relative">

                            {/* LEFT IMAGE */}
                            <div className="
                                      w-36 h-56 
                                      sm:w-44 sm:h-72 
                                      md:w-48 md:h-80 
                                      lg:w-60 lg:h-96 
                                      rounded-b-full overflow-hidden
                                    ">
                                <img
                                    src="https://res.cloudinary.com/dxgcq5wuz/image/upload/v1741857138/TechTalkWebsite/TTC%20Gallery/IMG-20250313-WA0011_ezd3ib.jpg"
                                    alt="Mission Visual 1"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* RIGHT IMAGE */}
                            <div className="
                                      w-36 h-56 
                                      sm:w-44 sm:h-72 
                                      md:w-48 md:h-80 
                                      lg:w-60 lg:h-96 
                                      rounded-t-full overflow-hidden shadow-lg
                                    ">
                                <img
                                    src="https://res.cloudinary.com/dxgcq5wuz/image/upload/v1741857134/TechTalkWebsite/TTC%20Gallery/IMG-20250313-WA0007_novsrt.jpg"
                                    alt="Mission Visual 2"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                        </div>


                        {/* RIGHT — TEXT CONTENT */}
                        <div>

                            {/* Decorative Title */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-[2px] w-12 bg-primary"></div>
                                <p className="text-sm tracking-widest text-primary font-semibold">
                                    OUR MISSION
                                </p>
                            </div>

                            {/* Heading */}
                            <h2 className="text-5xl font-semibold leading-tight text-foreground mb-6">
                                Driving Innovation & Growth
                            </h2>

                            {/* Description */}
                            <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-md">
                                The Tech Talk Club aims to bridge the gap between academic learning and
                                industry needs. We focus on empowering students with practical skills,
                                fostering creativity, and enabling networking with industry professionals.
                            </p>

                            {/* CTA BUTTON */}
                            <button className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
                                Get in touch
                            </button>

                        </div>
                        <div className="flex sm:hidden gap-1 mx-auto items-center justify-center relative">

                            {/* LEFT IMAGE */}
                            <div className="
                                      w-36 h-56 
                                      sm:w-44 sm:h-72 
                                      md:w-48 md:h-80 
                                      lg:w-60 lg:h-96 
                                      rounded-b-full overflow-hidden
                                    ">
                                <img
                                    src="https://res.cloudinary.com/dxgcq5wuz/image/upload/v1741857138/TechTalkWebsite/TTC%20Gallery/IMG-20250313-WA0011_ezd3ib.jpg"
                                    alt="Mission Visual 1"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* RIGHT IMAGE */}
                            <div className="
                                      w-36 h-56 
                                      sm:w-44 sm:h-72 
                                      md:w-48 md:h-80 
                                      lg:w-60 lg:h-96 
                                      rounded-t-full overflow-hidden shadow-lg
                                    ">
                                <img
                                    src="https://res.cloudinary.com/dxgcq5wuz/image/upload/v1741857134/TechTalkWebsite/TTC%20Gallery/IMG-20250313-WA0007_novsrt.jpg"
                                    alt="Mission Visual 2"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                        </div>

                    </div>
                </section>


                {/* --- Section 3 --- */}
                <KeyActivities />

                {/* --- Section 4 --- */}
                <section id="future-vision" className="py-10">
                    <div className="max-w-6xl mx-auto px-6">

                        {/* TOP SECTION – TITLE + ACCENT LINE */}
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-10 w-[3px] bg-primary rounded-full"></div>
                            <h2 className="text-5xl font-light tracking-tight text-foreground">
                                Future Vision
                            </h2>
                        </div>

                        {/* PROFESSIONAL CONTENT BLOCK */}
                        <div className="pl-8 border-l-[3px] border-primary/40">
                            <p className="text-xl leading-relaxed text-muted-foreground mb-6 max-w-4xl">
                                The future of the <span className="font-semibold text-foreground">Tech Talk Club</span>
                                is bright, promising, and built on sustainable growth. Our vision is to continue
                                expanding our student community, enhancing learning opportunities, and building
                                strong, meaningful industry relationships.
                            </p>

                            <p className="text-xl leading-relaxed text-muted-foreground max-w-4xl">
                                We remain committed to fostering
                                <span className="font-semibold text-primary"> innovation</span>,
                                <span className="font-semibold text-primary"> creativity</span>, and
                                <span className="font-semibold text-primary"> leadership</span>, empowering
                                students to thrive in an evolving tech landscape and inspiring them to shape
                                the future with confidence.
                            </p>
                        </div>

                    </div>
                </section>


            </div>
        </AppLayout>
    )
}
