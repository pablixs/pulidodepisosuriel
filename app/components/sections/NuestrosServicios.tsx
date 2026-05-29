"use client";

import { useState } from "react";
import Image from "next/image";

interface Servicio {
  id: number;
  tag: string;
  nombre: string;
  titulo: string;
  descripcion: string;
  features: string[];
  imagen: string;
}

const SERVICIOS: Servicio[] = [
  {
    id: 1,
    tag: "01",
    nombre: "Pulido y Plastificado",
    titulo: "Pulido y Plastificado de Pisos",
    descripcion:
      "El proceso de pulido elimina rayones, barnices viejos e imperfecciones, dejando la superficie perfectamente nivelada. Luego aplicamos plastificado de alta durabilidad que protege y embellece el piso por años. Ideal tanto para hogares como para locales comerciales.",
    features: [
      "Eliminación de rayones y marcas de uso",
      "Nivelación de superficies",
      "Aplicación de barniz de alta resistencia",
      "Acabado brillante o semimate",
      "Protección antihumedad",
    ],
    imagen: "/img1.webp",
  },
  {
    id: 2,
    tag: "02",
    nombre: "Hidrolaqueado",
    titulo: "Hidrolaqueado de Pisos",
    descripcion:
      "Alternativa ecológica al plastificado clásico, a base de agua, sin solventes ni olor fuerte. Resalta la veta natural de la madera con un acabado sedoso y resistente. Ideal para hogares con niños, mascotas o espacios con poca ventilación.",
    features: [
      "Formula al agua, sin olor",
      "Secado rápido",
      "No requiere evacuar el hogar",
      "Resalta la veta natural",
      "Acabado sedoso y mate",
    ],
    imagen: "/img2.webp",
  },
  {
    id: 3,
    tag: "03",
    nombre: "Restauración",
    titulo: "Restauración de Pisos",
    descripcion:
      "Reparamos juntas abiertas, piezas sueltas, sectores astillados o dañados por humedad. Devolvemos el aspecto y la funcionalidad original sin necesidad de reemplazar el piso completo. Trabajamos con madera, mármol, granito y más.",
    features: [
      "Reparación de juntas",
      "Reemplazo de piezas dañadas",
      "Tratamiento antihumedad",
      "Recuperación de piezas sueltas",
      "Tintado de zonas reparadas",
    ],
    imagen: "/img3.webp",
  },
];

const CHECK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function NuestrosServicios() {
  const [activo, setActivo] = useState<Servicio>(SERVICIOS[0]);

  return (
    <section id="servicios" className="ns3-wrap">
      <div className="ns3-header">
        <span className="ns3-eyebrow">Nuestros servicios</span>
        <h2 className="ns3-title">
          Soluciones para<br />
          <span>cada superficie</span>
        </h2>
      </div>

      <div className="ns3-cards">
        {SERVICIOS.map((s) => (
          <button
            key={s.id}
            className={`ns3-card${activo.id === s.id ? " active" : ""}`}
            onClick={() => setActivo(s)}
          >
            <div className="ns3-card-image">
              <Image
                src={s.imagen}
                alt={s.titulo}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="ns3-card-overlay" />
              <span className="ns3-card-num">{s.tag}</span>
            </div>
            <div className="ns3-card-content">
              <h3 className="ns3-card-title">{s.nombre}</h3>
              <div className="ns3-card-indicator">
                <span className="ns3-card-dot" />
                <span className="ns3-card-dot" />
                <span className="ns3-card-dot" />
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="ns3-detail">
        <div className="ns3-detail-image">
          <Image
            src={activo.imagen}
            alt={activo.titulo}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={activo.id === 1}
          />
        </div>

        <div className="ns3-detail-content">
          <div className="ns3-detail-header">
            <span className="ns3-detail-tag">{activo.tag}</span>
            <h3 className="ns3-detail-title">{activo.titulo}</h3>
          </div>

          <p className="ns3-detail-desc">{activo.descripcion}</p>

          <div className="ns3-detail-features">
            <h4 className="ns3-detail-features-title">Incluye</h4>
            <ul className="ns3-detail-features-list">
              {activo.features.map((f, i) => (
                <li key={i} className="ns3-detail-feature-item">
                  <span className="ns3-detail-check">{CHECK_ICON}</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <a href="#contacto" className="ns3-detail-cta">
            Solicitar presupuesto
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}