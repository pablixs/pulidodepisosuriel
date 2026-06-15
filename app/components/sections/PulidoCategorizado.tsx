"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Reveal from "@/app/components/ui/Reveal";

interface MediaItem {
  type: "video" | "image";
  src: string;
  alt: string;
}

interface Categoria {
  id: string;
  nombre: string;
  subtitulo: string;
  featured: MediaItem;
  media: MediaItem[];
}

const CATEGORIAS: Categoria[] = [
  {
    id: "hormigon",
    nombre: "Hormigón llaneado",
    subtitulo: "Superficies industriales con acabado técnico de alta resistencia",
    featured: {
      type: "video",
      src: "/hormigon-llaneado/hormigon-llaneado05.webm",
      alt: "Proceso de pulido de hormigón llaneado",
    },
    media: [
      { type: "image", src: "/hormigon-llaneado/hormigon-llaneado01.webp", alt: "Hormigón llaneado — resultado 1" },
      { type: "image", src: "/hormigon-llaneado/hormigon-llaneado02.webp", alt: "Hormigón llaneado — resultado 2" },
      { type: "image", src: "/hormigon-llaneado/hormigon-llaneado03.webp", alt: "Hormigón llaneado — resultado 3" },
      { type: "image", src: "/hormigon-llaneado/hormigon-llaneado04.webp", alt: "Hormigón llaneado — resultado 4" },
    ],
  },
  {
    id: "hormigon-vista",
    nombre: "Hormigón a la vista",
    subtitulo: "Desbaste, endurecimiento y abrillantado de hormigón visto para pisos de alta resistencia",
    featured: {
      type: "video",
      src: "/hormigon-vista/hormigonalavista.mp4",
      alt: "Proceso de pulido de hormigón a la vista",
    },
    media: [
      { type: "image", src: "/hormigon-vista/088391BD-1917-4594-A048-F141F818A57A.JPG.webp", alt: "Hormigón a la vista — resultado 1" },
      { type: "image", src: "/hormigon-vista/B00B9EC4-31D8-45A2-9464-90BCC10FAD5C.JPG.webp", alt: "Hormigón a la vista — resultado 2" },
      { type: "image", src: "/hormigon-vista/C194F76F-2707-4A4C-8910-989B80C7F288.JPG.webp", alt: "Hormigón a la vista — resultado 3" },
      { type: "image", src: "/hormigon-vista/E361C860-6C22-4A58-AC96-1C50C37D38D4.JPG.webp", alt: "Hormigón a la vista — resultado 4" },
    ],
  },
  {
    id: "mosaicos",
    nombre: "Mosaicos",
    subtitulo: "Restauración de mosaico calcáreos, graníticos y venecianos",
    featured: {
      type: "video",
      src: "/mosaico/mosaico-vid01.webm",
      alt: "Proceso de pulido de mosaicos",
    },
    media: [
      { type: "image", src: "/mosaico/mosaico01.webp", alt: "Mosaicos — resultado 1" },
      { type: "image", src: "/mosaico/mosaico02.webp", alt: "Mosaicos — resultado 2" },
    ],
  },
  {
    id: "marmol",
    nombre: "Mármol",
    subtitulo: "Pulido y abrillantado de mármol para recuperar su brillo natural efecto espejo",
    featured: {
      type: "video",
      src: "/marmol/marmol-vid.mp4",
      alt: "Proceso de pulido de mármol",
    },
    media: [
      { type: "image", src: "/marmol/marmol01.webp", alt: "Mármol — resultado 1" },
      { type: "image", src: "/marmol/marmol02.webp", alt: "Mármol — resultado 2" },
      { type: "image", src: "/marmol/marmol03.webp", alt: "Mármol — resultado 3" },
      { type: "image", src: "/marmol/marmol04.webp", alt: "Mármol — resultado 4" },
      { type: "image", src: "/marmol/marmol05.webp", alt: "Mármol — resultado 5" },
      { type: "image", src: "/marmol/marmol06.webp", alt: "Mármol — resultado 6" },
      { type: "image", src: "/marmol/marmol07.webp", alt: "Mármol — resultado 7" },
    ],
  },
];

export default function PulidoCategorizado() {
  const [activa, setActiva] = useState(CATEGORIAS[0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCategoryChange = useCallback((cat: Categoria) => {
    setActiva(cat);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section id="pulido" className="pc-section">
      <div className="pc-inner">
        <Reveal>
          <div className="pc-header">
            <span className="pc-eyebrow">Especialidades</span>
            <h2 className="pc-title">
              Nuestro<br />
              <span>diferencial</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="pc-tabs">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.id}
                className={`pc-tab ${activa.id === cat.id ? "pc-tab--active" : ""}`}
                onClick={() => handleCategoryChange(cat)}
              >
                <span className="pc-tab-name">{cat.nombre}</span>
                <span className="pc-tab-line" />
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200} direction="scale">
          <div className="pc-showcase" key={activa.id}>
            <div className="pc-featured">
              {activa.featured.type === "video" ? (
                <video
                  ref={videoRef}
                  className="pc-featured-video"
                  src={activa.featured.src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  poster=""
                />
              ) : (
                <Image
                  src={activa.featured.src}
                  alt={activa.featured.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              )}
              <div className="pc-featured-overlay">
                <span className="pc-featured-label">{activa.nombre}</span>
                <p className="pc-featured-sub">{activa.subtitulo}</p>
              </div>
            </div>

            <div className="pc-grid">
              {activa.media.map((item, i) => (
                <div key={i} className="pc-grid-item">
                  {item.type === "video" ? (
                    <video
                      className="pc-grid-media"
                      src={item.src}
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="pc-cta-wrap">
            <a href="#contacto" className="pc-cta">
              Consultá por este servicio
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
