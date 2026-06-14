"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  initialPosition?: number;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Antes",
  afterAlt = "Después",
  initialPosition = 50,
  className = "",
}: BeforeAfterSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const before = beforeRef.current;
    const resizer = resizerRef.current;
    if (!slider || !before || !resizer) return;

    let active = false;
    const beforeImg = before.querySelector("img") as HTMLImageElement | null;

    function syncImageWidth() {
      if (beforeImg) {
        beforeImg.style.width = slider!.offsetWidth + "px";
        beforeImg.style.maxWidth = "none";
      }
    }

    function slideIt(x: number) {
      const w = Math.max(0, Math.min(x, slider!.offsetWidth));
      before!.style.width = w + "px";
      resizer!.style.left = w + "px";
    }

    syncImageWidth();
    slideIt(slider.offsetWidth * initialPosition / 100);

    const ro = new ResizeObserver(() => syncImageWidth());
    ro.observe(slider);

    function onDown(e: PointerEvent) {
      e.preventDefault();
      active = true;
      slideIt(e.clientX - slider!.getBoundingClientRect().left);
    }

    function onMove(e: PointerEvent) {
      if (!active) return;
      e.preventDefault();
      slideIt(e.clientX - slider!.getBoundingClientRect().left);
    }

    function onUp() {
      active = false;
    }

    slider.addEventListener("pointerdown", onDown);
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onUp);

    function onKey(e: KeyboardEvent) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const step = slider!.offsetWidth * (e.shiftKey ? 0.1 : 0.02);
      const cur = parseFloat(before!.style.width) || 0;
      slideIt(e.key === "ArrowLeft" ? cur - step : cur + step);
    }
    resizer.addEventListener("keydown", onKey);

    return () => {
      ro.disconnect();
      slider.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
      resizer.removeEventListener("keydown", onKey);
    };
  }, [initialPosition]);

  return (
    <div ref={sliderRef} className={`ba-slider ${className}`}>
      <div className="ba-slider__after">
        <Image
          src={afterImage}
          alt={afterAlt}
          width={1920}
          height={1080}
          sizes="(max-width:768px) 100vw, 1100px"
          className="ba-slider__img"
          draggable={false}
          priority
        />
      </div>

      <div ref={beforeRef} className="ba-slider__before">
        <Image
          src={beforeImage}
          alt={beforeAlt}
          width={1920}
          height={1080}
          sizes="(max-width:768px) 100vw, 1100px"
          className="ba-slider__img"
          draggable={false}
          priority
        />
      </div>

      <div
        ref={resizerRef}
        className="ba-slider__resizer"
        role="slider"
        tabIndex={0}
        aria-label="Comparador de imágenes"
        aria-valuenow={initialPosition}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <svg className="ba-slider__icon" viewBox="0 0 24 24" fill="none">
          <path d="M8 4L3 12L8 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 4L21 12L16 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <span className="ba-slider__tag ba-slider__tag--before">Antes</span>
      <span className="ba-slider__tag ba-slider__tag--after">Después</span>
    </div>
  );
}
