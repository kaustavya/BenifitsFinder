import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: "education",
    title: "Scholarship & Education Support",
    desc: "Financial aid and scholarships for students to continue education.",
    img: "https://cdn.builder.io/api/v1/image/assets%2F4cc3384f65e545ca80f7eeb4c328e33b%2F594c9c2454f74fb6a8fdbf65ac154fd4?format=webp&width=1600",
    cta: { text: "Know More", url: "/resources#education", external: false },
  },
  {
    id: "women",
    title: "Women Empowerment Programs",
    desc: "Skill development, micro-credit and entrepreneurship support for women.",
    img: "https://cdn.builder.io/api/v1/image/assets%2F4cc3384f65e545ca80f7eeb4c328e33b%2Fbeef885618e3422ab6c482875817115c?format=webp&width=1600",
    cta: { text: "Apply Now", url: "/results#women", external: false },
  },
  {
    id: "agri",
    title: "Agriculture & Farmer Support",
    desc: "Subsidies, market access and insurance to protect farmers' livelihoods.",
    img: "https://cdn.builder.io/api/v1/image/assets%2F4cc3384f65e545ca80f7eeb4c328e33b%2Ff4f5ee7dc73f4f90a5109f445ee52b6e?format=webp&width=1600",
    cta: { text: "Know More", url: "/resources#agriculture", external: false },
  },
  {
    id: "housing",
    title: "PM Awas Yojana — Affordable Housing",
    desc: "Support and subsidies to help low-income families access housing.",
    img: "https://cdn.builder.io/api/v1/image/assets%2F4cc3384f65e545ca80f7eeb4c328e33b%2F2040691a31194251877e033f4a4c3728?format=webp&width=1600",
    cta: { text: "Apply Now", url: "https://pmaymis.gov.in/", external: true },
  },
];

export default function SchemeCarousel(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [paused]);

  function goTo(i: number) {
    setIndex(i % slides.length);
  }

  return (
    <section
      className="relative w-full min-h-[60vh] md:min-h-[75vh] flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((s, i) => (
          <img
            key={s.id}
            src={s.img}
            alt={s.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{ transform: "translateZ(0)" }}
            loading="eager"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(106,27,154,0.18)] via-[rgba(0,0,0,0.28)] to-[rgba(106,27,154,0.10)] pointer-events-none"></div>
      </div>

      <div className="container relative z-10 py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.2"
                  fill="white"
                />
                <path
                  d="M12 4v8l3 3"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-semibold text-white/95 tracking-wide">
                Official Government Services
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
              {slides[index].title}
            </h2>
            <p className="mt-3 text-white/90 text-lg md:text-xl max-w-2xl">
              {slides[index].desc}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              {slides[index].cta.external ? (
                <a
                  href={slides[index].cta.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-semibold shadow btn-primary glow"
                >
                  {slides[index].cta.text}
                </a>
              ) : (
                <Link
                  to={slides[index].cta.url}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-semibold shadow btn-primary glow"
                >
                  {slides[index].cta.text}
                </Link>
              )}

              <a
                href="/resources"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[rgba(255,255,255,0.06)] text-white bg-[rgba(255,255,255,0.02)]"
              >
                Browse Schemes
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${i === index ? "bg-white" : "bg-white/60"}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:block md:w-1/2">
            <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[hsl(var(--primary))]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                      fill="#fff"
                      opacity="0.2"
                    />
                    <path
                      d="M12 7v5l3 3"
                      stroke="hsl(var(--foreground))"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Apply for Schemes
                  </h3>
                  <p className="text-sm text-white/80">
                    Find the right schemes for your needs and apply easily.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href="/resources#education"
                  className="block text-left px-3 py-2 rounded-md bg-[rgba(255,255,255,0.04)] text-white/90 border border-[rgba(255,255,255,0.06)]"
                >
                  Education
                </a>
                <a
                  href="/resources#women"
                  className="block text-left px-3 py-2 rounded-md bg-[rgba(255,255,255,0.04)] text-white/90 border border-[rgba(255,255,255,0.06)]"
                >
                  Women
                </a>
                <a
                  href="/resources#agriculture"
                  className="block text-left px-3 py-2 rounded-md bg-[rgba(255,255,255,0.04)] text-white/90 border border-[rgba(255,255,255,0.06)]"
                >
                  Agriculture
                </a>
                <a
                  href="/resources#housing"
                  className="block text-left px-3 py-2 rounded-md bg-[rgba(255,255,255,0.04)] text-white/90 border border-[rgba(255,255,255,0.06)]"
                >
                  Housing
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
