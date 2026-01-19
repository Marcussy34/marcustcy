"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGsapScrollOptions {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  once?: boolean;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

/**
 * Hook for GSAP scroll-triggered animations
 * Returns a ref to attach to the element you want to animate
 */
export function useGsapScroll<T extends HTMLElement>(options: UseGsapScrollOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: 50,
          ...options.from,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          ...options.to,
          scrollTrigger: {
            trigger: ref.current,
            start: options.start || "top 85%",
            end: options.end || "top 50%",
            scrub: options.scrub || false,
            toggleActions: options.once !== false ? "play none none none" : "play reverse play reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Hook for staggered children animations
 */
export function useGsapStagger<T extends HTMLElement>(
  childSelector: string,
  options: { stagger?: number; from?: gsap.TweenVars; to?: gsap.TweenVars } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        childSelector,
        {
          opacity: 0,
          y: 40,
          ...options.from,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: options.stagger || 0.1,
          ...options.to,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [childSelector]);

  return ref;
}
