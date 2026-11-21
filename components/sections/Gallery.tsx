"use client";

import { type TouchEvent, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

// Local road videos (served from /public/video)
const roadVideos: string[] = [
  "/video/video12.mp4",
  "/video/video22.mp4",
  "/video/video202.mp4",
  "/video/video223.mp4",
  "/video/video234.mp4",
];

// Videos visible at once: mobile 1, tablet 2, desktop 4
function getPerView() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

export default function Gallery() {
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const maxIndex = Math.max(roadVideos.length - perView, 0);

  // Track screen size
  useEffect(() => {
    const update = () => setPerView(getPerView());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Keep index valid when perView changes
  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  // Wrap-around navigation
  const goTo = useCallback(
    (next: number) => {
      if (next > maxIndex) setIndex(0);
      else if (next < 0) setIndex(maxIndex);
      else setIndex(next);
    },
    [maxIndex]
  );

  // Autoplay
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isPaused, maxIndex]);

  // Swipe
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 45) return;
    goTo(index + (distance < 0 ? 1 : -1));
  };

  const dots = Array.from({ length: maxIndex + 1 });

  return (
    <section
      id="gallery"
      className="bg-cream-100 py-24 dark:bg-asphalt-950 sm:py-32"
    >
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Success Stories"
          title="Every Brand Has a Story. We Bring It to Life."
          description="From restaurants and retail to jewelry, real estate, manufacturing, and multiplex cinemas, every project reflects creativity, strategy, and measurable impact."
        />

        <div
          className="mt-16"
          role="region"
          aria-roledescription="carousel"
          aria-label="Road video gallery"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Viewport */}
          <div
            className="-mx-2.5 overflow-hidden"
            style={{ touchAction: "pan-y" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Track */}
            <motion.div
              className="flex"
              animate={{ x: `-${index * (100 / perView)}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {roadVideos.map((src, i) => (
                <div
                  key={src}
                  className="shrink-0 px-2.5"
                  style={{ width: `${100 / perView}%` }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-luxury">
                    <video
                      src={src}
                      className="aspect-[9/16] max-h-[72svh] w-full object-cover md:max-h-none"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-12 text-xs font-semibold text-white">
                      <span>Road Story {String(i + 1).padStart(2, "0")}</span>
                      <span>
                        {String(i + 1).padStart(2, "0")} /{" "}
                        {String(roadVideos.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          {maxIndex > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous road video"
                onClick={() => goTo(index - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-asphalt-950/15 text-asphalt-950 transition hover:border-ember-500 hover:text-ember-500 dark:border-cream-50/20 dark:text-cream-50"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1.5" aria-label="Choose slide">
                {dots.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index
                        ? "w-6 bg-ember-500"
                        : "w-1.5 bg-asphalt-950/20 dark:bg-cream-50/30"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next road video"
                onClick={() => goTo(index + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-asphalt-950/15 text-asphalt-950 transition hover:border-ember-500 hover:text-ember-500 dark:border-cream-50/20 dark:text-cream-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}