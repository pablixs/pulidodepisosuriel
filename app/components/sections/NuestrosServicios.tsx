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
    nombre: "Plastificado e hidrolaqueado",
    titulo: "Plastificado e hidrolaqueado de Pisos",
    descripcion:
      "El proceso de pulido elimina rayones, barnices viejos e imperfecciones, dejando la superficie perfectamente nivelada. Luego aplicamos plastificado de alta durabilidad que protege y embellece el piso por años. Ideal tanto para hogares como para locales comerciales.",
    features: [
      "Eliminación de rayones y marcas de uso",
      "Nivelación de superficies",
      "Aplicación de barniz de alta resistencia",
      "Acabado brillante o semimate",
      "Protección antihumedad",
    ],
    imagen: "/hidrolaqueado/hidrolaqueado-img1.webp",
  },
  {
    id: 2,
    tag: "02",
    nombre: "Mármol y mosaicos",
    titulo: "Mármol y mosaicos",
    descripcion:
      "Servicio profesional de restauración sin polvo. Elimina manchas, rayas e imperfecciones profundas. Devuelve el brillo espejo original del material. Ideal para renovar pisos antiguos sin generar suciedad.",
    features: [
      "Pulido diamantado sin polvo",
      "Eliminación de manchas y rayas",
      "Sellado e impermeabilización protectora",
      "Brillo natural efecto espejo",
      "No requiere evacuar el hogar",
    ],
    imagen: "/mosaico/mosaico01.webp",
  },
  {
    id: 3,
    tag: "03",
    nombre: "Hormigón",
    titulo: "Pulido de hormigón a la vista",
    descripcion:
      "Realizamos el desbaste mecánico, endurecimiento y abrillantado de superficies para transformar el hormigón visto en un suelo de alta resistencia, higiénico y estético. Eliminamos imperfecciones, lechadas superficiales y marcas de obra mediante abrasivos pesados. Aumentamos la densidad interna del material para garantizar un brillo natural duradero y una superficie libre de polvo, ideal para naves industriales, cocheras, comercios y viviendas modernas.",
    features: [
      "Desbaste grueso con discos metálicos",
      "Apertura de poro mediante abrasivos metálicos",
      "Aplicación de densificador endurecedor líquido",
      "Refinado de la superficie con discos diamantados",
      "Pulido progresivo con diamantados de alta graduación",
      "Abrillantado final y sellado de alta resistencia",
    ],
    imagen: "/hormigon-llaneado/hormigon-llaneado01.webp",
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