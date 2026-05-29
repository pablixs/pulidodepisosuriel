"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Reveal from "@/app/components/ui/Reveal";

interface BeforeAfterProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfter({
  beforeSrc = "/img/before.jpeg",
  afterSrc  = "/img/after.jpeg",
  beforeLabel = "Antes",
  afterLabel  = "Después",
}: BeforeAfterProps) {
  const [pos, setPos] = useState(42);
  const [dragging, setDragging] = useState(false);
  const [hinted, setHinted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef(false);

  const calcPos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const raw = ((clientX - left) / width) * 100;
    setPos(Math.min(98, Math.max(2, raw)));
  }, []);

  const onMouseDown = (e: React.MouseEvent) => { setDragging(true); calcPos(e.clientX); };
  const onMouseMove = useCallback((e: MouseEvent) => { if (dragging) calcPos(e.clientX); }, [dragging, calcPos]);
  const onMouseUp   = useCallback(() => setDragging(false), []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = false;
    setDragging(true);
    calcPos(e.touches[0].clientX);
  };

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!dragging) return;

    const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);

    if (!isHorizontalSwipe.current && deltaX > deltaY) {
      isHorizontalSwipe.current = true;
    }

    if (isHorizontalSwipe.current) {
      e.preventDefault();
      calcPos(e.touches[0].clientX);
    }
  }, [dragging, calcPos]);

  const onTouchEnd = useCallback(() => {
    setDragging(false);
    isHorizontalSwipe.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend",  onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend",  onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  useEffect(() => {
    const t = setTimeout(() => setHinted(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="comparacion" className="ba-section">
      <div className="ba-inner">
        <Reveal>
          <div className="ba-copy">
            <span className="ba-eyebrow">Resultados reales</span>
            <h2 className="ba-title">
              No lo cambies,
              <em>¡Restáuralo!</em>
            </h2>
            <p className="ba-desc">
              <strong>De lo viejo a lo nuevo sin cambiar ni una baldosa.</strong>{" "}
              Devolvemos el brillo original de tus pisos con técnicas profesionales
              adaptadas a cada material. Presupuesto sin compromiso.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150} direction="scale">
          <div
            ref={containerRef}
            className="ba-comparator"
            style={{ "--ba-pos": `${pos}%` } as React.CSSProperties}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            <img className="ba-img" src={afterSrc} alt="Piso restaurado" draggable={false} />
            <img className="ba-img ba-img-before" src={beforeSrc} alt="Piso antes de restaurar" draggable={false} />
            <span className="ba-label ba-label-before">{beforeLabel}</span>
            <span className="ba-label ba-label-after">{afterLabel}</span>
            <div className="ba-divider" />
            <div className={`ba-handle${dragging ? " dragging" : ""}`}>
              <span className="ba-handle-arrow">‹</span>
              <span className="ba-handle-arrow">›</span>
            </div>
            <div className={`ba-hint ${hinted && !dragging ? "visible" : "hidden"}`}>
              <span className="ba-hint-line" />
              Deslizá para comparar
              <span className="ba-hint-line" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="ba-cta-wrap">
            <a href="#contacto" className="ba-cta">
              Quiero un presupuesto →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}