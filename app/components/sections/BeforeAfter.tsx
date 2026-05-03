"use client";

import { useRef, useState, useCallback, useEffect } from "react";

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
  const [pos, setPos] = useState(42); // porcentaje 0-100
  const [dragging, setDragging] = useState(false);
  const [hinted, setHinted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Calcular posición desde evento ──
  const calcPos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const raw = ((clientX - left) / width) * 100;
    setPos(Math.min(98, Math.max(2, raw)));
  }, []);

  // ── Mouse ──
  const onMouseDown = (e: React.MouseEvent) => { setDragging(true); calcPos(e.clientX); };
  const onMouseMove = useCallback((e: MouseEvent) => { if (dragging) calcPos(e.clientX); }, [dragging, calcPos]);
  const onMouseUp   = useCallback(() => setDragging(false), []);

  // ── Touch ──
  const onTouchStart = (e: React.TouchEvent) => { setDragging(true); calcPos(e.touches[0].clientX); };
  const onTouchMove  = useCallback((e: TouchEvent) => { if (dragging) { e.preventDefault(); calcPos(e.touches[0].clientX); } }, [dragging, calcPos]);
  const onTouchEnd   = useCallback(() => setDragging(false), []);

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

  // Hint de arrastre al montar
  useEffect(() => {
    const t = setTimeout(() => setHinted(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        .ba-section {
          background: var(--color-bg);
          padding: 5rem 1.5rem 6rem;
          position: relative;
          overflow: hidden;
        }

        /* fondo con patrón sutil */
        .ba-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(128,128,128,0.03) 0px,
            rgba(128,128,128,0.03) 1px,
            transparent 1px,
            transparent 20px
          );
          pointer-events: none;
        }

        .ba-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Copy ── */
        .ba-copy {
          max-width: 640px;
          margin: 0 auto 3rem;
          text-align: center;
        }

        .ba-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--color-accent);
          display: block;
          margin-bottom: 1rem;
        }

        .ba-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--color-text);
          margin: 0 0 1.4rem;
        }

        .ba-title em {
          color: var(--color-accent);
          font-style: normal;
          display: block;
        }

        .ba-desc {
          font-family: 'Barlow', sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          color: var(--color-text-muted);
          margin: 0;
        }

        .ba-desc strong {
          color: var(--color-text);
          font-weight: 600;
        }

        /* ── Comparador ── */
        .ba-comparator {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 3px;
          overflow: hidden;
          cursor: col-resize;
          user-select: none;
          touch-action: none;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        }

        /* Imagen base (después, ocupa todo) */
        .ba-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          pointer-events: none;
        }

        /* Imagen de encima (antes), recortada con clip */
        .ba-img-before {
          clip-path: inset(0 calc(100% - var(--ba-pos, 42%)) 0 0);
          z-index: 1;
        }

        /* ── Divisor ── */
        .ba-divider {
          position: absolute;
          top: 0;
          bottom: 0;
          left: var(--ba-pos, 42%);
          transform: translateX(-50%);
          width: 2px;
          background: #fff;
          z-index: 3;
          pointer-events: none;
        }

        /* Línea superior e inferior con degradado */
        .ba-divider::before,
        .ba-divider::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 30%;
        }
        .ba-divider::before {
          top: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.8));
        }
        .ba-divider::after {
          bottom: 0;
          background: linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,0.8));
        }

        /* Handle circular */
        .ba-handle {
          position: absolute;
          top: 50%;
          left: var(--ba-pos, 42%);
          transform: translate(-50%, -50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          pointer-events: none;
          transition: transform 0.15s ease;
        }

        .ba-handle.dragging {
          transform: translate(-50%, -50%) scale(1.12);
        }

        .ba-handle-arrow {
          color: var(--color-accent);
          font-size: 1rem;
          line-height: 1;
          font-weight: 900;
        }

        /* ── Labels ── */
        .ba-label {
          position: absolute;
          top: 1.2rem;
          z-index: 2;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.3rem 0.8rem;
          border-radius: 2px;
          pointer-events: none;
          transition: opacity 0.2s;
        }

        .ba-label-before {
          left: 1.2rem;
          background: rgba(0,0,0,0.55);
          color: #e0d5c5;
          border: 1px solid rgba(255,255,255,0.15);
        }

        .ba-label-after {
          right: 1.2rem;
          background: rgba(201,138,58,0.85);
          color: #fff;
        }

        /* hint de arrastre */
        .ba-hint {
          position: absolute;
          bottom: 1.4rem;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
          white-space: nowrap;
        }

        .ba-hint.visible { opacity: 1; }
        .ba-hint.hidden  { opacity: 0; }

        .ba-hint-line {
          width: 20px;
          height: 1px;
          background: rgba(255,255,255,0.4);
        }

        /* ── CTA ── */
        .ba-cta-wrap {
          margin-top: 2.5rem;
          display: flex;
          justify-content: center;
        }

        .ba-cta {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.9rem 2.4rem;
          background: var(--color-accent);
          color: #fff;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          transition: background 0.18s, transform 0.12s;
        }

        .ba-cta:hover  { background: #a8721e; }
        .ba-cta:active { transform: scale(0.98); }

        /* ── Responsive ── */
        @media (max-width: 700px) {
          .ba-section { padding: 3.5rem 1rem 4.5rem; }
          .ba-comparator { aspect-ratio: 3 / 4; }
          .ba-handle { width: 40px; height: 40px; }
        }
      `}</style>

      <section className="ba-section">
        <div className="ba-inner">

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

          {/* Comparador */}
          <div
            ref={containerRef}
            className="ba-comparator"
            style={{ "--ba-pos": `${pos}%` } as React.CSSProperties}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            {/* Imagen después (base) */}
            <img className="ba-img" src={afterSrc} alt="Piso restaurado" draggable={false} />

            {/* Imagen antes (recortada) */}
            <img className="ba-img ba-img-before" src={beforeSrc} alt="Piso antes de restaurar" draggable={false} />

            {/* Labels */}
            <span className="ba-label ba-label-before">{beforeLabel}</span>
            <span className="ba-label ba-label-after">{afterLabel}</span>

            {/* Línea divisoria */}
            <div className="ba-divider" />

            {/* Handle */}
            <div className={`ba-handle${dragging ? " dragging" : ""}`}>
              <span className="ba-handle-arrow">‹</span>
              <span className="ba-handle-arrow">›</span>
            </div>

            {/* Hint */}
            <div className={`ba-hint ${hinted && !dragging ? "visible" : "hidden"}`}>
              <span className="ba-hint-line" />
              Arrastrá para comparar
              <span className="ba-hint-line" />
            </div>
          </div>

          {/* CTA */}
          <div className="ba-cta-wrap">
            <a href="#contacto" className="ba-cta">
              Quiero un presupuesto →
            </a>
          </div>

        </div>
      </section>
    </>
  );
}