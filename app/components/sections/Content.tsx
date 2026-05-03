export default function Content (){
  return (
    <div
      className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="grid gap-10 lg:grid-cols-2">

        {/* Texto */}
        <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
          <div className="max-w-xl mb-6">
            <h2
              className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none"
              style={{ color: 'var(--color-text)' }}
            >
              Renovación experta
            </h2>
            <p
              className="text-base md:text-lg"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Con años de experiencia en el cuidado de superficies, nos especializamos
              en la restauración técnica de una amplia variedad de materiales. Ya sea
              la elegancia natural del mármol, la resistencia del hormigón, el encanto
              clásico del mosaico o la calidez del parquet, nuestro trabajo consiste en
              devolverles el brillo y la textura del primer día. Utilizo procesos de
              pulido y terminación adaptados a cada necesidad, garantizando durabilidad
              y un acabado impecable que transforma cualquier ambiente.
            </p>
          </div>
        </div>

        {/* Imágenes */}
        <div className="flex items-center justify-center -mx-4 lg:pl-8">
          <div className="flex flex-col items-end px-3">
            <img
              className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
              src="img1.webp"
              alt="Trabajo de pulido"
            />
            <img
              className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
              src="img2.webp"
              alt="Detalle de piso restaurado"
            />
          </div>
          <div className="px-3">
            <img
              className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
              src="img3.webp"
              alt="Resultado final"
            />
          </div>
        </div>

      </div>
    </div>
  );
};