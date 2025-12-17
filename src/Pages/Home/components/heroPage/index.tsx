"use client";

import { GradientLetters } from "@/components/GradientLetter";
import { Button } from "@/components/ui/button";
import { Redirect } from "@/Utils/RedirectionFunc";
import { ArrowRight, Compass, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-background via-background to-background/95 text-foreground">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[650px] w-[650px] rounded-full bg-primary/30 blur-[180px] opacity-30" />
      </div>

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 -z-10 opacity-[0.05] bg-[url('/noise.png')]" />

      <div className="mx-auto  w-full flex  flex-col items-center text-center md:py10 animate-fade-in">
        {/* IMAGE SECTION */}
        <div
          className="
            relative w-full 
            h-[70dvh]        /* mobile: 70% screen height */
            md:h-[70dvh]    /* desktop: 60% screen height */
            flex flex-col items-center justify-center
            bg-cover bg-center bg-no-repeat 
            backdrop-brightness-50
          "
          style={{
            backgroundImage:
              "url('./assets/img/IMG-20250311-WA0047.jpg')",
          }}
        >
          <div className=" absolute inset-0 w-full h-full bg-black/50 -z-0"></div>
          <div className=" px-4 py-6 rounded-xl z-10">
            <GradientLetters text="Inspire. Learn. Build." />
          </div>

          <p className="mt-5 max-w-2xl text-md text-white md:text-lg px-4 drop-shadow-lg">
            A student-driven tech community hosting events, workshops,
            competitions, blogs, and discussions — helping students grow through
            technology and collaboration.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 z-10">
            <Button
              size="lg"
              onClick={()=>Redirect('/events')}
              className="px-8 h-12 cursor-pointer rounded-xl shadow-lg dark:bg-white dark:text-black font-semibold transition-all"
            >
            Explore Events <Compass className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="px-8 h-12 rounded-xl backdrop-blur-md border-primary/20 hover:bg-primary/10"
            >
              Watch Intro <Play className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* CTA Buttons */}

        {/* Stats Section */}
        <div className="mt-5 grid w-full max-w-4xl grid-cols-1 gap-8 rounded-2xl  p-10 shadow-lg backdrop-blur-lg md:grid-cols-3">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary">10+</h3>
            <p className="text-muted-foreground mt-1">Events Organized</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary">30+</h3>
            <p className="text-muted-foreground mt-1">Active Members</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary">500+</h3>
            <p className="text-muted-foreground mt-1">Community Discussions</p>
          </div>
        </div>
      </div>
    </section>
  );
}
