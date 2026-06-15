"use client";

import { useRef, useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TRABAJOS = [
  { id: 5, src: "/videos_60fps/video5.mp4", label: "Trabajo 1" },
  { id: 8, src: "/videos_nc/video8_compressed.mp4", label: "Trabajo 2" },
  { id: 10, src: "/videos_60fps/video10.mp4", label: "Trabajo 3" },
];

export default function VideosSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const initialSlide = 1;
  const [activeIndex, setActiveIndex] = useState(initialSlide);

  const playSlide = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (video) video.play().catch(() => {});
  }, []);

  const pauseSlide = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const idx = swiper.activeIndex;
    setActiveIndex(idx);
    videoRefs.current.forEach((_, i) => {
      if (i === idx) playSlide(i);
      else pauseSlide(i);
    });
  }, [playSlide, pauseSlide]);

  const handleInit = useCallback((swiper: SwiperType) => {
    const idx = swiper.activeIndex;
    setActiveIndex(idx);
    playSlide(idx);
  }, [playSlide]);

  const handleVideoEnded = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const handleSlideClick = useCallback((index: number) => {
    if (swiperRef.current && swiperRef.current.activeIndex !== index) {
      swiperRef.current.slideTo(index);
    }
  }, []);

  return (
    <section id="videos" className="vs-section">
      <div className="vs-header">
        <span className="vs-eyebrow">Galería en movimiento</span>
        <h2 className="vs-title">
          Insaurralde<br />
          <span>Flooring</span>
        </h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={12}
        slidesPerView={1.3}
        centeredSlides={true}
        loop={false}
        initialSlide={initialSlide}
        speed={500}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 24 },
        }}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onInit={handleInit}
        className="vs-swiper"
      >
        {TRABAJOS.map((trabajo, index) => (
          <SwiperSlide key={trabajo.id} className="vs-slide">
            <div
              className={`vs-card ${index === activeIndex ? 'vs-card--active' : ''}`}
              onClick={() => handleSlideClick(index)}
              role="button"
              tabIndex={0}
            >
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                className="vs-video"
                src={trabajo.src}
                muted
                playsInline
                preload="metadata"
                onEnded={handleVideoEnded}
              />
              <span className="vs-label">{trabajo.label}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
