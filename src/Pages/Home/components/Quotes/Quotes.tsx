"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/src/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function Quotes() {
  const quoteRef = useRef(null);
  const authorRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!quoteRef.current || !authorRef.current || !sectionRef.current) return;

    const quoteSplit = new SplitText(quoteRef.current, {
      type: "words",
      wordsClass: "word",
    });

    const authorSplit = new SplitText(authorRef.current, {
      type: "words",
      wordsClass: "word",
    });

    const ctx = gsap.context(() => {
      // Pin for exact duration needed
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top", // Fixed scroll distance
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          markers: false,
        },
      });

      tl.from(quoteSplit.words, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "power2.out",
      }).from(
        authorSplit.words,
        {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen bg-background px-6 flex items-center justify-center"
    >
      <div className="max-w-4xl text-center">
        <h1
          ref={quoteRef}
          className="text-5xl sm:text-5xl md:text-6xl font-bold leading-tight"
        >
          ALONE, WE CAN DO SO LITTLE; TOGETHER, WE CAN DO SO MUCH
        </h1>

        <p
          ref={authorRef}
          className="mt-8 text-xl font-semibold text-gray-500 tracking-wide"
        >
          — Helen Keller
        </p>
      </div>
    </div>
  );
}

export default Quotes;