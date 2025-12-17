"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { GradientLetters } from "@/components/GradientLetter";
import { useTheme } from "@/components/ModeProvider/modeprovider";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const logoUrl =
    theme === "light"
      ? "/assets/logo/IMG-20250903-WA0023 copy.png"
      : "/assets/logo/image (6).png";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        [
          logoRef.current,
          headingRef.current,
          textRef.current,
          linkRef.current,
        ],
        {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        py-16 sm:py-36
        text-foreground
        bg-background
      "
    >
      {/* Light mode gradient background */}
      <div className="absolute inset-0 pointer-events-none dark:hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-violet-300/30 blur-[140px]" />
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-pink-300/30 blur-[140px]" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-emerald-300/30 blur-[140px]" />
        <div className="absolute -bottom-24 -right-32 h-96 w-96 rounded-full bg-yellow-300/30 blur-[140px]" />
      </div>

      {/* Content */}
      <div
        className="
          relative z-10
          max-w-4xl mx-auto px-6
          flex flex-col md:flex-row
          gap-10
          text-center md:text-left
        "
      >
        {/* Logo */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <img
            ref={logoRef}
            src={logoUrl}
            alt="Tech Talk Club Logo"
            className="h-28 sm:h-32 w-auto object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h2
            ref={headingRef}
            className="
              text-4xl sm:text-5xl
              font-semibold
              tracking-tight
              mb-6
            "
          >
            About <br className="sm:hidden" />
            <GradientLetters
              text="TechTalk Club"
              classname="inline-block"
            />
          </h2>

          <div ref={textRef} className="mb-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              The{" "}
              <span className="font-semibold text-primary">
                TechTalk Club
              </span>{" "}
              is a vibrant community dedicated to fostering innovation,
              collaboration, and continuous learning in the world of technology.
              Established in 2025, our mission is to bridge knowledge gaps
              through engaging tech talks, workshops, and interactive sessions.
              We celebrate curiosity and create opportunities for members to
              connect, grow, and thrive together.
            </p>
          </div>

          {/* Link */}
          <a
            ref={linkRef}
            href="/about"
            className="
              inline-flex items-center
              text-primary
              font-medium
              transition-colors
              hover:text-primary/80
              justify-center md:justify-start
            "
          >
            Club Overview
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
