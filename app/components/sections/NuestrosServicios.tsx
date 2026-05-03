"use client";

import { useState } from "react";
import { Slide } from "@/app/components/ui/Slider";

interface Servicio {
  id: number;
  tag: string;
  nombre: string;
  titulo: string;
  descripcion: string;
}

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
      <style>{`
        .ns-wrap {
          background: var(--color-bg);
          font-family: 'Barlow', sans-serif;
          padding: 6rem 0 7rem;
          position: relative;
          overflow: hidden;
        }

        .ns-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              rgba(128,128,128,0.04) 39px,
              rgba(128,128,128,0.04) 40px
            );
          pointer-events: none;
        }

        .ns-header {
          text-align: center;
          margin-bottom: 6rem;
          position: relative;
        }

        .ns-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(3.2rem, 8vw, 6.5rem);
          font-weight: 600;
          line-height: 0.92;
          letter-spacing: -0.02em;
          color: var(--color-text);
          text-transform: uppercase;
          margin: 0;
        }

        .ns-heading span {
          color: var(--color-accent);
          display: block;
        }

        .ns-header-line {
          width: 60px;
          height: 3px;
          background: var(--color-accent);
          margin: 1.8rem auto 0;
        }

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
          border-right: 1px solid var(--color-border);
          max-height: 520px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--color-accent) transparent;
          position: relative;
          z-index: 1;
        }

        .ns-lista::-webkit-scrollbar { width: 3px; }
        .ns-lista::-webkit-scrollbar-track { background: transparent; }
        .ns-lista::-webkit-scrollbar-thumb { background: var(--color-accent); border-radius: 2px; }

        .ns-item {
          display: flex;
          align-items: stretch;
          cursor: pointer;
          border-bottom: 1px solid var(--color-border);
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

        .ns-item:hover { background: var(--color-surface); }
        .ns-item.activo { background: var(--color-surface); }

        .ns-item.activo::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--color-accent);
        }

        .ns-item-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--color-text-soft);
          width: 44px;
          min-width: 44px;
          display: flex;
          align-items: flex-start;
          padding: 1.4rem 0 1.4rem 1.2rem;
          transition: color 0.2s;
        }

        .ns-item.activo .ns-item-tag { color: var(--color-accent); }

        .ns-item-texto {
          padding: 1.4rem 1.2rem 1.4rem 0;
          flex: 1;
        }

        .ns-item-nombre {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--color-text-soft);
          text-transform: uppercase;
          line-height: 1.2;
          transition: color 0.2s;
        }

        .ns-item.activo .ns-item-nombre { color: var(--color-text); }

        .ns-item-arrow {
          display: flex;
          align-items: center;
          padding-right: 1rem;
          color: var(--color-accent);
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

        .ns-panel-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.35em;
          color: var(--color-accent);
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
          background: var(--color-accent);
          opacity: 0.5;
        }

        .ns-panel-titulo {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 900;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: var(--color-text);
          line-height: 1.05;
          margin: 0;
        }

        .ns-panel-desc {
          font-size: 0.975rem;
          line-height: 1.75;
          color: var(--color-text-muted);
          max-width: 560px;
          margin: 0;
        }

        /* ── Slider ── */
        .ns-slider-wrapper {
          position: relative;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 2px;
          aspect-ratio: 16 / 7;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ns-slider-wrapper::before,
        .ns-slider-wrapper::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: var(--color-accent);
          border-style: solid;
          opacity: 0.4;
          z-index: 2;
        }
        .ns-slider-wrapper::before { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
        .ns-slider-wrapper::after  { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

        .ns-slider-slot {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ns-container { grid-template-columns: 1fr; }

          .ns-lista {
            display: flex;
            flex-direction: row;
            max-height: none;
            overflow-x: auto;
            overflow-y: hidden;
            border-right: none;
            border-bottom: 1px solid var(--color-border);
            gap: 0;
          }

          .ns-item {
            flex-direction: column;
            min-width: 160px;
            border-bottom: none;
            border-right: 1px solid var(--color-border);
            padding: 0;
            justify-content: flex-start;
          }

          .ns-item.activo::before {
            top: auto; bottom: 0; left: 0; right: 0;
            width: auto; height: 3px;
          }

          .ns-item-tag { padding: 1rem 1rem 0.3rem; }
          .ns-item-texto { padding: 0 1rem 1rem; }
          .ns-item-arrow { display: none; }
          .ns-panel { padding: 2rem 0 0; }
        }

        @media (max-width: 560px) {
          .ns-wrap { padding: 4rem 0 5rem; }
          .ns-header { margin-bottom: 2.5rem; }
          .ns-item { min-width: 140px; }
          .ns-panel-titulo { font-size: 1.6rem; }
          .ns-slider-wrapper { aspect-ratio: 4 / 3; }
        }
      `}</style>

      <section className="ns-wrap">
        <div className="ns-header">
          <h2 className="ns-heading">
            Nuestros
            <span>Servicios</span>
          </h2>
          <div className="ns-header-line" />
        </div>

        <div className="ns-container">
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

          <div className={`ns-panel${animando ? " saliendo" : ""}`}>
            <div className="ns-panel-inner">
              <span className="ns-panel-tag">Servicio {activo.tag}</span>
              <h3 className="ns-panel-titulo">{activo.titulo}</h3>
              <p className="ns-panel-desc">{activo.descripcion}</p>

              <div className="ns-slider-wrapper">
                <div className="ns-slider-slot">
                  <Slide />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}