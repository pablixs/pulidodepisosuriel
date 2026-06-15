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

const GALLERY = [
  { src: "/img/gallery/B3FCEA1B-AC54-4A85-80CA-9E016D7BABB3.webp", alt: "Trabajo de restauración 1" },
  { src: "/img/gallery/gallerythumb01.jpeg", alt: "Trabajo de restauración 2" },
  { src: "/img/gallery/gallerythumb02.jpeg", alt: "Trabajo de restauración 3" },
  { src: "/img/gallery/gallerythumb05.jpeg", alt: "Trabajo de restauración 4" },
  { src: "/img/gallery/gallerythumb07.jpeg", alt: "Trabajo de restauración 5" },
  { src: "/img/gallery/gallerythumb08.jpeg", alt: "Trabajo de restauración 6" },
  { src: "/img/gallery/gallerythumb09.jpeg", alt: "Trabajo de restauración 7" },
  { src: "/img/gallery/gallerythumb10.jpeg", alt: "Trabajo de restauración 8" },
  { src: "/img/gallery/gallerythumb11.jpeg", alt: "Trabajo de restauración 9" },
  { src: "/img/gallery/gallerythumb12.jpeg", alt: "Trabajo de restauración 10" },
  { src: "/img/gallery/gallerythumb13.jpeg", alt: "Trabajo de restauración 11" },
  { src: "/img/gallery/gallerythumb14.jpeg", alt: "Trabajo de restauración 12" },
  { src: "/img/gallery/gallerythumb15.jpeg", alt: "Trabajo de restauración 13" },
  { src: "/img/gallery/gallerythumb19.jpeg", alt: "Trabajo de restauración 14" },
  { src: "/img/gallery/gallerythumb20.jpeg", alt: "Trabajo de restauración 15" },
  { src: "/img/gallery/gallerythumb21.jpeg", alt: "Trabajo de restauración 16" },
  { src: "/img/gallery/gallerythumb22.jpeg", alt: "Trabajo de restauración 17" },
  { src: "/img/gallery/gallerythumb25.jpeg", alt: "Trabajo de restauración 18" },
  { src: "/img/gallery/gallerythumb26.jpeg", alt: "Trabajo de restauración 19" },
  { src: "/img/gallery/gallerythumb27.jpeg", alt: "Trabajo de restauración 20" },
  { src: "/img/gallery/gallerythumb28.jpeg", alt: "Trabajo de restauración 21" },
  { src: "/img/gallery/gallerythumb30.jpeg", alt: "Trabajo de restauración 22" },
  { src: "/img/gallery/gallerythumb31.jpeg", alt: "Trabajo de restauración 23" },
  { src: "/img/gallery/ABBBFF96-9002-4121-B42E-6C74DFC37236.JPG.webp", alt: "Trabajo de restauración 24" },
  { src: "/img/gallery/F355BE2C-6C1D-4B6A-ABE7-31BFE32AF88F.webp", alt: "Trabajo de restauración 26" },
  { src: "/img/gallery/IMG_1933.webp", alt: "Trabajo de restauración 27" },
  { src: "/img/gallery/IMG_9050.JPG.webp", alt: "Trabajo de restauración 28" },
];

export default function Gallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section id="trabajos" className="gal-section">
      <Reveal>
        <div className="gal-header">
          <span className="gal-eyebrow">Portfolio</span>
          <h2 className="gal-title">
            Nuestros<br />
            <span>Trabajos</span>
          </h2>
        </div>
      </Reveal>

      <Reveal delay={150} direction="scale">
        <div className="gal-viewer">
          <div className="gal-counter">
            <span className="gal-counter-current">{String(currentIndex + 1).padStart(2, "0")}</span>
            <span className="gal-counter-sep">/</span>
            <span className="gal-counter-total">{String(GALLERY.length).padStart(2, "0")}</span>
          </div>

          <Swiper
            className="gal-main"
            loop={true}
            spaceBetween={0}
            navigation={true}
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          >
            {GALLERY.map((img, i) => (
              <SwiperSlide key={`${img.src}-${i}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            className="gal-thumbs"
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={6}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            breakpoints={{
              0: { slidesPerView: 5 },
              480: { slidesPerView: 7 },
              768: { slidesPerView: 9 },
              1024: { slidesPerView: 11 },
            }}
          >
            {GALLERY.map((img, i) => (
              <SwiperSlide key={`thumb-${img.src}-${i}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="80px"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Reveal>
    </section>
  );
}
