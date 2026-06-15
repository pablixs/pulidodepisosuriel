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

const GALLERY = Array.from({ length: 31 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/img/gallery/gallerythumb${n}.jpeg`,
    alt: `Trabajo de restauración ${i + 1}`,
  };
});

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
