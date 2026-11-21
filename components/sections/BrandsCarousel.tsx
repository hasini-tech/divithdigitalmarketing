import Image from "next/image";

import { brands } from "@/lib/data";

export default function BrandsCarousel() {
  // 6 copies fill wide screens. The animation moves -16.666% (one copy) for a seamless loop.
  const looped = [
    ...brands,
    ...brands,
    ...brands,
    ...brands,
    ...brands,
  ];

  return (
    <section className="relative isolate overflow-hidden border-y border-black/5 bg-cream-50/80 py-8 dark:border-white/5 dark:bg-asphalt-900/70">
      {/* soft red glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,0,63,0.08),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(250,0,63,0.12),transparent_55%)]" />

      <div className="relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream-50/95 via-cream-50/80 to-transparent dark:from-asphalt-900 dark:via-asphalt-900/90" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream-50/95 via-cream-50/80 to-transparent dark:from-asphalt-900 dark:via-asphalt-900/90" />

        {/* scrolling track */}
        <div className="flex w-max animate-marquee items-center gap-12 hover:[animation-play-state:paused] sm:gap-16">
          {looped.map((brand, i) => (
            <div
              key={`${brand.id}-${i}`}
              title={brand.name}
              className="group relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-black/10 transition duration-300 hover:scale-110 hover:shadow-xl hover:ring-2 hover:ring-[#fa003f]/60 dark:ring-white/10 sm:h-28 sm:w-28"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={112}
                height={112}
                className="h-full w-full rounded-full object-contain p-2.5 opacity-90 transition duration-300 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}