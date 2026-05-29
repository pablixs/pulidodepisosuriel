import Image from "next/image";

export default function Content() {
  return (
    <section id="nosotros" className="section-content">
      <div className="content-grid">
        <div className="content-text">
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
            garantizando durabilidad y un acabado impeccable que transforma cualquier ambiente.
          </p>
        </div>

        <div className="content-images">
          <div className="content-img-1">
            <Image
              src="/img1.webp"
              alt="Pulido de mármol"
              fill
              style={{ objectFit: "cover" }}
              sizes="200px"
            />
          </div>
          <div className="content-img-2">
            <Image
              src="/img2.webp"
              alt="Piso restaurado"
              fill
              style={{ objectFit: "cover" }}
              sizes="160px"
            />
          </div>
          <div className="content-img-3">
            <Image
              src="/img3.webp"
              alt="Terminación premium"
              fill
              style={{ objectFit: "cover" }}
              sizes="320px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}