"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Reveal from "@/app/components/ui/Reveal";

type Categoria = "todos" | "marmol" | "madera" | "hormigon";

const ICON_MARMOL = (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <path d="M6 8L20 5L34 8V32L20 35L6 32V8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M6 8L20 14L34 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M10 32L20 18L30 32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M20 18V35" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="20" cy="14" r="2" fill="currentColor" opacity="0.4"/>
  </svg>
);

const ICON_MADERA = (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <rect x="5" y="10" width="30" height="20" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <line x1="13" y1="10" x2="13" y2="30" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="20" y1="10" x2="20" y2="30" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="27" y1="10" x2="27" y2="30" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M8 16C10 14 12 18 14 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M22 16C24 14 26 18 28 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M16 22C18 20 20 24 22 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const ICON_HORMIGON = (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <rect x="5" y="5" width="30" height="30" rx="3" stroke="currentColor" strokeWidth="1.8"/>
    <line x1="5" y1="15" x2="35" y2="15" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="5" y1="25" x2="35" y2="25" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="15" y1="5" x2="15" y2="35" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="25" y1="5" x2="25" y2="35" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="17" y="17" width="6" height="6" fill="currentColor" opacity="0.25" rx="1"/>
  </svg>
);

const ICON_TODOS = (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <rect x="5" y="5" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="23" y="5" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="5" y="23" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="23" y="23" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);

const CATEGORIAS: { id: Categoria; label: string; icon: React.ReactNode }[] = [
  { id: "todos", label: "Todos", icon: ICON_TODOS },
  { id: "marmol", label: "Mármol y Granito", icon: ICON_MARMOL },
  { id: "madera", label: "Madera", icon: ICON_MADERA },
  { id: "hormigon", label: "Hormigón", icon: ICON_HORMIGON },
];

const GALLERY_ALL = Array.from({ length: 31 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/img/gallery/gallerythumb${n}.jpeg`,
    alt: `Trabajo de restauración ${i + 1}`,
    categoria: ["marmol", "madera", "hormigon"][i % 3] as Categoria,
  };
});

export default function Gallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [categoria, setCategoria] = useState<Categoria>("todos");

  const filtered = categoria === "todos"
    ? GALLERY_ALL
    : GALLERY_ALL.filter((img) => img.categoria === categoria);

  return (
    <section id="trabajos" className="gallery-section">
      <div className="gallery-header">
        <Reveal direction="left">
          <div className="gallery-title-group">
            <span className="section-eyebrow">Portfolio</span>
            <h2 className="section-title">
              Nuestros<br />
              <span>Trabajos</span>
            </h2>
          </div>
        </Reveal>

        <Reveal direction="right" delay={100}>
          <div className="gallery-filters">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.id}
                className={`gallery-filter${categoria === cat.id ? " active" : ""}`}
                onClick={() => setCategoria(cat.id)}
              >
                <span className="gallery-filter-icon">{cat.icon}</span>
                <span className="gallery-filter-label">{cat.label}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className="gallery-swiper">
          <Swiper
            className="gallery-main"
            loop={true}
            spaceBetween={16}
            navigation={true}
            thumbs={{
              swiper: thumbsSwiper && thumbsSwiper !== null ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {filtered.map((img, i) => (
              <SwiperSlide key={`${img.src}-${i}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 1400px"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            className="gallery-thumbs"
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={8}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            breakpoints={{
              0: { slidesPerView: 4 },
              480: { slidesPerView: 6 },
              768: { slidesPerView: 8 },
              1024: { slidesPerView: 10 },
            }}
          >
            {filtered.map((img, i) => (
              <SwiperSlide key={`thumb-${img.src}-${i}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="150px"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div className="gallery-info">
          <div className="gallery-info-text">
            <h3>Transformamos espacios</h3>
            <p>
              Cada proyecto es único. Trabajamos con materiales nobles para devolver 
              el brillo y la funcionalidad a tus pisos, respetando el carácter original 
              de cada espacio.
            </p>
          </div>
          <div className="gallery-stats">
            <div className="gallery-stat">
              <span className="gallery-stat-number">31+</span>
              <span className="gallery-stat-label">Proyectos</span>
            </div>
            <div className="gallery-stat">
              <span className="gallery-stat-number">10+</span>
              <span className="gallery-stat-label">Años</span>
            </div>
            <div className="gallery-stat">
              <span className="gallery-stat-number">100%</span>
              <span className="gallery-stat-label">Satisfacción</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}