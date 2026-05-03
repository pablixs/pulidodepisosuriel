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

import SectionHeading from "@/app/components/ui/Titulos";

// ── 15 imágenes de galería ──
const GALLERY_IMAGES = Array.from({ length: 31 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
        src: `/img/gallery/gallerythumb${n}.jpeg`,
        alt: `Trabajo de pulido y restauración ${n}`,
    };
});


export default function Galleryy() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <>
            <style>{`
        /* ── Swiper principal ── */
        .gallery-main {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 2px;
          overflow: hidden;
          background: var(--color-surface);
        }

        .gallery-main .swiper-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Flechas de navegación */
        .gallery-main .swiper-button-next,
        .gallery-main .swiper-button-prev {
          color: #fff;
          background: rgba(0, 0, 0, 0.4);
          width: 40px;
          height: 40px;
          border-radius: 2px;
          transition: background 0.18s;
        }

        .gallery-main .swiper-button-next:hover,
        .gallery-main .swiper-button-prev:hover {
          background: var(--color-accent);
        }

        .gallery-main .swiper-button-next::after,
        .gallery-main .swiper-button-prev::after {
          font-size: 14px;
          font-weight: 900;
        }

        /* ── Thumbnails ── */
        .gallery-thumbs {
          margin-top: 8px;
          height: 88px;
        }

        .gallery-thumbs .swiper-slide {
          opacity: 0.4;
          cursor: pointer;
          border-radius: 2px;
          overflow: hidden;
          transition: opacity 0.2s, border-color 0.2s;
          border: 2px solid transparent;
          box-sizing: border-box;
        }

        .gallery-thumbs .swiper-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .gallery-thumbs .swiper-slide-thumb-active {
          opacity: 1;
          border-color: var(--color-accent);
        }

        .gallery-thumbs .swiper-slide:hover {
          opacity: 0.75;
        }

        @media (max-width: 640px) {
          .gallery-main  { aspect-ratio: 4 / 3; }
          .gallery-thumbs { height: 64px; }
        }
      `}</style>

            <div
                className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
                style={{ background: "var(--color-bg)" }}
            >
                <SectionHeading
                    eyebrow="Nuestros trabajos"
                    lineOne=""
                    lineTwo="Galería"
                    acento="oxido"
                />

                {/* Swiper principal */}
                <Swiper
                    className="gallery-main"
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}
                    modules={[FreeMode, Navigation, Thumbs]}
                >
                    {GALLERY_IMAGES.map((img) => (
                        <SwiperSlide key={img.src}>
                            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(max-width: 768px) 100vw, 1100px"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Swiper thumbnails */}
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
                        480: { slidesPerView: 5 },
                        768: { slidesPerView: 7 },
                        1024: { slidesPerView: 9 },
                    }}
                >
                    {GALLERY_IMAGES.map((img) => (
                        <SwiperSlide key={img.src}>
                            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(max-width: 768px) 100vw, 1100px"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </>
    );
};