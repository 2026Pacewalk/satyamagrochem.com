"use client";

import { useCallback, useEffect, useState } from "react";

const slides = [
  { image: "/img/slider/slide1.jpg", title: "Sustainable Solutions\nfor a Thriving Agriculture" },
  { image: "/img/slider/slide2.jpg", title: "Green Harvesting\nfor a Sustainable Future" },
  { image: "/img/slider/slide3.jpg", title: "Greening the Future\nwith Sustainable Farming" },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[460px] w-full overflow-hidden sm:h-[560px] lg:h-[640px]">
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${s.image})` }}
          aria-hidden={i !== index}
        >
          <div className="absolute inset-0 bg-black/35" />
        </div>
      ))}

      {/* Caption */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <h1 className="max-w-4xl whitespace-pre-line text-center font-display text-3xl font-bold leading-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">
          {slides[index].title}
        </h1>
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-brand text-white shadow-md transition-colors hover:bg-brand-dark sm:left-6"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-brand text-white shadow-md transition-colors hover:bg-brand-dark sm:right-6"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.image}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-7 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
