"use client";

import BeforeAfterSlider from "@/app/components/ui/BeforeAfterSlider";
import Reveal from "@/app/components/ui/Reveal";

export default function BeforeAfter() {
  return (
    <section id="comparacion" className="ba-section">
      <div className="ba-inner">
        <Reveal>
          <div className="ba-copy">
            <span className="ba-eyebrow">Resultados reales</span>
            <h2 className="ba-title">
              No lo cambies,<em>¡Restáuralo!</em>
            </h2>
            <p className="ba-desc">
              <strong>De lo viejo a lo nuevo sin cambiar ni una baldosa.</strong>{" "}
              Devolvemos el brillo original de tus pisos con técnicas profesionales
              adaptadas a cada material. Presupuesto sin compromiso.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150} direction="scale">
          <BeforeAfterSlider
            beforeImage="/img/before.jpeg"
            afterImage="/img/after.jpeg"
            beforeAlt="Piso antes de restaurar"
            afterAlt="Piso restaurado"
            initialPosition={50}
          />
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
