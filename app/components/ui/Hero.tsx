"use client";

import { useEffect, useRef } from "react";

interface HeroProps {
  videoSrc?: string;
}

export default function Hero({ videoSrc }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc]);

  return (
    <section id="inicio" className="hero">
      {videoSrc && (
        <video
          ref={videoRef}
          className="hero-video"
          src={videoSrc}
          muted
          loop
          playsInline
        />
      )}
      {!videoSrc && (
        <div className="hero-video" style={{ background: "linear-gradient(135deg, #1a1917 0%, #2a2520 100%)" }} />
      )}
      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-eyebrow">Restauración profesional de pisos</span>
        <h1 className="hero-title">
          De viejo a <span>nuevo</span>
        </h1>
        <p className="hero-subtitle">
          Sin polvo. Restauración con resultados que transforman cualquier ambiente.
        </p>
        <div className="hero-actions">
          <a href="#contacto" className="hero-btn-primary">
            Solicitar presupuesto
          </a>
          <a href="#trabajos" className="hero-btn-secondary">
            Ver nuestros trabajos
          </a>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-text">Deslizá</span>
      </div>
    </section>
  );
}