"use client";

import { useState } from "react";
import { Slide } from "@/app/components/ui/Slider";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Servicio {
  id: number;
  tag: string;         // etiqueta corta (ej: "01")
  nombre: string;      // título del item en la lista
  titulo: string;      // título grande en el panel derecho
  descripcion: string; // texto descriptivo
}

// ─── Datos (editá acá tus servicios) ──────────────────────────────────────────

const SERVICIOS: Servicio[] = [
  {
    id: 1,
    tag: "01",
    nombre: "Pulido y Plastificado",
    titulo: "Pulido y Plastificado de Pisos",
    descripcion:
      "Renovamos superficies sin necesidad de obra. El pulido elimina rayones, barnices viejos e imperfecciones, dejando el piso perfectamente nivelado para recibir el plastificado. El resultado es una superficie dura, brillante y de larga duración, ideal tanto para hogares como para locales comerciales de alto tránsito.",
  },
  {
    id: 2,
    tag: "02",
    nombre: "Hidrolaqueado",
    titulo: "Hidrolaqueado de Pisos",
    descripcion:
      "Alternativa ecológica al plastificado clásico, a base de agua, sin solventes ni olor fuerte. Resalta la veta natural de la madera con un acabado sedoso y resistente. Ideal para hogares con niños, mascotas o espacios con poca ventilación donde el confort durante el trabajo es prioritario.",
  },
  {
    id: 3,
    tag: "03",
    nombre: "Restauración",
    titulo: "Restauración de Pisos",
    descripcion:
      "Reparamos juntas abiertas, piezas sueltas, sectores astillados o dañados por humedad. Devolvemos el aspecto y la funcionalidad original sin necesidad de reemplazar el piso completo. Trabajamos con madera, mosaico granítico, mármol y porcelanato, adaptando materiales y técnicas a cada caso.",
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function NuestrosServicios() {
  const [activo, setActivo] = useState<Servicio>(SERVICIOS[0]);
  const [animando, setAnimando] = useState(false);

  const handleSeleccion = (s: Servicio) => {
    if (s.id === activo.id) return;
    setAnimando(true);
    setTimeout(() => {
      setActivo(s);
      setAnimando(false);
    }, 220);
  };

  return (
    <>
      {/* ── Estilos ── */}
      <style>{`

        :root {
          --ns-bg:        #f7f5f2;
          --ns-surface:   #eeebe6;
          --ns-border:    #d8d2c8;
          --ns-accent:    #fa9827;
          --ns-accent2:   #9a6020;
          --ns-text:      #1a1714;
          --ns-muted:     #8a8078;
          --ns-selected:  #ede6d8;
        }

        .ns-wrap {
          font-family: 'Barlow', sans-serif;
          padding: 6rem 0 7rem;
          position: relative;
          overflow: hidden;
        }

        /* Textura de fondo sutil */
        .ns-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              rgba(0,0,0,0.018) 39px,
              rgba(0,0,0,0.018) 40px
            );
          pointer-events: none;
        }

        /* ── Encabezado ── */
        .ns-header {
          text-align: center;
          margin-bottom: 6rem;
          position: relative;
        }

        .ns-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.35em;
          color: var(--ns-accent);
          text-transform: uppercase;
          margin-bottom: 1rem;
          display: block;
        }

        .ns-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(3.2rem, 8vw, 6.5rem);
          font-weight: 600;
          line-height: 0.92;
          letter-spacing: -0.02em;
          color: var(--ns-text);
          text-transform: uppercase;
          margin: 0;
        }

        .ns-heading span {
          color: var(--ns-accent);
          display: block;
        }

        /* línea decorativa */
        .ns-header-line {
          width: 60px;
          height: 3px;
          background: var(--ns-accent);
          margin: 1.8rem auto 0;
        }

        /* ── Layout principal ── */
        .ns-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 0;
          align-items: start;
        }

        /* ── Lista izquierda ── */
        .ns-lista {
          border-right: 1px solid var(--ns-border);
          max-height: 520px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--ns-accent) transparent;
          position: relative;
          z-index: 1;
        }

        .ns-lista::-webkit-scrollbar { width: 3px; }
        .ns-lista::-webkit-scrollbar-track { background: transparent; }
        .ns-lista::-webkit-scrollbar-thumb { background: var(--ns-accent); border-radius: 2px; }

        .ns-item {
          display: flex;
          align-items: stretch;
          cursor: pointer;
          border-bottom: 1px solid var(--ns-border);
          background: transparent;
          transition: background 0.2s;
          position: relative;
          text-align: left;
          width: 100%;
          padding: 0;
          border-left: none;
          border-top: none;
          border-right: none;
          outline: none;
        }

        .ns-item:hover { background: rgba(212,160,74,0.04); }

        .ns-item.activo {
          background: var(--ns-selected);
        }

        /* barra lateral de ítem activo */
        .ns-item.activo::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--ns-accent);
        }

        .ns-item-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--ns-muted);
          width: 44px;
          min-width: 44px;
          display: flex;
          align-items: flex-start;
          padding: 1.4rem 0 1.4rem 1.2rem;
          transition: color 0.2s;
        }

        .ns-item.activo .ns-item-tag { color: var(--ns-accent); }

        .ns-item-texto {
          padding: 1.4rem 1.2rem 1.4rem 0;
          flex: 1;
        }

        .ns-item-nombre {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--ns-muted);
          text-transform: uppercase;
          line-height: 1.2;
          transition: color 0.2s;
        }

        .ns-item.activo .ns-item-nombre { color: var(--ns-text); }

        /* flecha */
        .ns-item-arrow {
          display: flex;
          align-items: center;
          padding-right: 1rem;
          color: var(--ns-accent);
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
          font-size: 1.1rem;
        }

        .ns-item.activo .ns-item-arrow { opacity: 1; transform: translateX(3px); }

        /* ── Panel derecho ── */
        .ns-panel {
          padding: 0 0 0 2.8rem;
          transition: opacity 0.22s ease, transform 0.22s ease;
        }

        .ns-panel.saliendo {
          opacity: 0;
          transform: translateY(10px);
        }

        .ns-panel-inner {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        /* etiqueta del servicio activo */
        .ns-panel-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.35em;
          color: var(--ns-accent);
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .ns-panel-tag::after {
          content: '';
          flex: 1;
          max-width: 40px;
          height: 1px;
          background: var(--ns-accent);
          opacity: 0.5;
        }

        .ns-panel-titulo {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 900;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: var(--ns-text);
          line-height: 1.05;
          margin: 0;
        }

        .ns-panel-desc {
          font-size: 0.975rem;
          line-height: 1.75;
          color: #6b6058;
          max-width: 560px;
          margin: 0;
        }

        /* ── Espacio del slider ── */
        .ns-slider-wrapper {
          position: relative;
          background: var(--ns-surface);
          border: 1px solid var(--ns-border);
          border-radius: 2px;
          aspect-ratio: 16 / 7;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* placeholder visual mientras no hay slider */
        .ns-slider-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: var(--ns-muted);
          pointer-events: none;
          user-select: none;
        }

        .ns-slider-icon {
          width: 48px;
          height: 48px;
          opacity: 0.25;
        }

        .ns-slider-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          opacity: 0.3;
        }

        /* esquinas decorativas del slider */
        .ns-slider-wrapper::before,
        .ns-slider-wrapper::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: var(--ns-accent);
          border-style: solid;
          opacity: 0.4;
          z-index: 2;
        }
        .ns-slider-wrapper::before { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
        .ns-slider-wrapper::after  { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

        /* slot real del slider (el que insertás vos) */
        .ns-slider-slot {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ns-container {
            grid-template-columns: 1fr;
          }

          .ns-lista {
            display: flex;
            flex-direction: row;
            max-height: none;
            overflow-x: auto;
            overflow-y: hidden;
            border-right: none;
            border-bottom: 1px solid var(--ns-border);
            scrollbar-width: thin;
            scrollbar-color: var(--ns-accent) transparent;
            gap: 0;
            padding-bottom: 0;
          }

          .ns-item {
            flex-direction: column;
            min-width: 160px;
            border-bottom: none;
            border-right: 1px solid var(--ns-border);
            padding: 0;
            justify-content: flex-start;
          }

          .ns-item.activo::before {
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: auto;
            height: 3px;
          }

          .ns-item-tag { padding: 1rem 1rem 0.3rem; }
          .ns-item-texto { padding: 0 1rem 1rem; }
          .ns-item-arrow { display: none; }

          .ns-panel {
            padding: 2rem 0 0;
          }
        }

        @media (max-width: 560px) {
          .ns-wrap { padding: 4rem 0 5rem; }
          .ns-header { margin-bottom: 2.5rem; }
          .ns-item { min-width: 140px; }
          .ns-panel-titulo { font-size: 1.6rem; }
          .ns-slider-wrapper { aspect-ratio: 4 / 3; }
        }
      `}</style>

      {/* ── Sección ── */}
      <section className="ns-wrap">
        {/* Encabezado */}
        <div className="ns-header">
          <h2 className="ns-heading">
            Nuestros
            <span>Servicios</span>
          </h2>
          <div className="ns-header-line" />
        </div>

        {/* Layout */}
        <div className="ns-container">

          {/* Lista izquierda */}
          <nav className="ns-lista" aria-label="Servicios">
            {SERVICIOS.map((s) => (
              <button
                key={s.id}
                className={`ns-item${activo.id === s.id ? " activo" : ""}`}
                onClick={() => handleSeleccion(s)}
                aria-current={activo.id === s.id ? "true" : undefined}
              >
                <span className="ns-item-tag">{s.tag}</span>
                <span className="ns-item-texto">
                  <span className="ns-item-nombre">{s.nombre}</span>
                </span>
                <span className="ns-item-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </nav>

          {/* Panel derecho */}
          <div className={`ns-panel${animando ? " saliendo" : ""}`}>
            <div className="ns-panel-inner">

              <span className="ns-panel-tag">Servicio {activo.tag}</span>

              <h3 className="ns-panel-titulo">{activo.titulo}</h3>

              <p className="ns-panel-desc">{activo.descripcion}</p>

              {/* Espacio del slider — insertá tu componente dentro de .ns-slider-slot */}
              <div className="ns-slider-wrapper">

                {/*
                  ╔══════════════════════════════════════════════════╗
                  ║  INSERTÁ TU SLIDER AQUÍ dentro del div de abajo  ║
                  ║  El div ocupa todo el espacio del recuadro.      ║
                  ╚══════════════════════════════════════════════════╝
                */}
                <div className="ns-slider-slot">
                  <Slide/>
                </div>

                {/* Placeholder visual (podés eliminar esto cuando tengas el slider) */}
                {/* <div className="ns-slider-placeholder">
                  <svg className="ns-slider-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="4" y="10" width="40" height="28" rx="2"/>
                    <path d="M4 20l10-6 8 5 8-8 14 9"/>
                    <circle cx="14" cy="18" r="3"/>
                  </svg>
                  <span className="ns-slider-label">Galería de trabajos</span>
                </div> */}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
