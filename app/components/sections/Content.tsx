"use client";

import Image from "next/image";
import Reveal from "@/app/components/ui/Reveal";

export default function Content() {
  return (
    <section id="nosotros" className="ct-section">
      <div className="ct-inner">
        <div className="ct-media">
          <Reveal direction="left">
            <div className="ct-media-main">
              <video
                className="ct-video"
                src="/hidrolaqueado/hidrolaqueado-vid1.webm"
                muted
                loop
                playsInline
                autoPlay
              />
            </div>
          </Reveal>
          <div className="ct-media-stack">
            <Reveal delay={100}>
              <div className="ct-stack-item">
                <Image
                  src="/hormigon-llaneado/hormigon-llaneado02.webp"
                  alt="Hormigón llaneado"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 45vw, 200px"
                />
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="ct-stack-item">
                <Image
                  src="/mosaico/mosaico01.webp"
                  alt="Mosaico restaurado"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 45vw, 200px"
                />
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="ct-stack-item ct-stack-accent">
                <Image
                  src="/hidrolaqueado/hidrolaqueado-img1.webp"
                  alt="Hidrolaqueado terminado"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 45vw, 200px"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="ct-text">
          <Reveal direction="right">
            <span className="section-eyebrow">Sobre nosotros</span>
            <h2 className="section-title">
              Renovación<br />
              <span>experta</span>
            </h2>
            <p className="section-body">
              Con años de experiencia en el cuidado de superficies, nos especializamos
              en la restauración técnica de una amplia variedad de materiales. Ya sea
              la elegancia natural del mármol, la resistencia del hormigón, el encanto
              clásico del mosaico o la calidez del parquet, nuestro trabajo consiste en
              devolverles el brillo y la textura del primer día.
            </p>
            <p className="section-body">
              Utilizamos procesos de pulido y terminación adaptados a cada necesidad,
              garantizando durabilidad y un acabado impecable que transforma cualquier ambiente.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="ct-stats">
              <div className="ct-stat">
                <span className="ct-stat-num">10+</span>
                <span className="ct-stat-label">Años de experiencia</span>
              </div>
              <div className="ct-stat">
                <span className="ct-stat-num">500+</span>
                <span className="ct-stat-label">Proyectos realizados</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
