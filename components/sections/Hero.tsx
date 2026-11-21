"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------
const HERO_BG_SRC = "/images/vlogger.png";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-asphalt-950 px-4 py-24 sm:px-8 lg:px-16"
    >
      {/* Full-bleed background image */}
      <Image
        src={HERO_BG_SRC}
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className="object-cover"
      />
      {/* Right-weighted gradient so text stays legible on the left */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-asphalt-950/20 via-asphalt-950/45 to-asphalt-950/70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-asphalt-950/60 via-transparent to-asphalt-950/20" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div
          className={`mr-auto w-full max-w-xl text-left transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {/* Eyebrow */}
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-cream-100/60 sm:text-xs sm:tracking-[0.35em]">
            Divith Digital Marketing{" "}
            <span className="text-ember-400">·</span> Creative Ideas{" "}
            <span className="text-ember-400">·</span> Measurable Results
          </p>

          {/* Headline */}
          <h1 className="font-heading text-[13vw] font-extrabold uppercase leading-[0.95] tracking-tight text-cream-50 sm:text-6xl lg:text-7xl">
            We Create
            <br />
            Impact
            <br />
            <span className="text-ember-400">Not Just</span>
            <br />
            <span className="text-ember-400">Impressions.</span>
          </h1>

          {/* Body copy */}
          <p className="mr-auto mt-6 max-w-md text-sm leading-relaxed text-cream-100/70 sm:text-base">
            We don&apos;t just market brands. We build digital success
            stories through creativity, strategy, and performance-driven
            marketing.
          </p>
        </div>
      </div>
    </section>
  );
}