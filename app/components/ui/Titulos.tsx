interface SectionHeadingProps {
  eyebrow?: string;
  lineOne?: string;
  lineTwo: string;
  acento?: "dorado" | "piedra" | "oxido";
}

const acentos = {
  dorado: { text: "text-[var(--color-accent3)]", bg: "bg-[var(--color-accent3)]" },
  piedra: { text: "text-[var(--color-accent-piedra)]", bg: "bg-[var(--color-accent-piedra)]" },
  oxido:  { text: "text-[var(--color-accent-oxido)]", bg: "bg-[var(--color-accent-oxido)]" },
} as const;

export default function Titulos({
  eyebrow,
  lineOne,
  lineTwo,
  acento = "dorado",
}: SectionHeadingProps) {
  const color = acentos[acento];

  return (
    <div className="text-center mb-16">
      {eyebrow && (
        <span
          className={`${color.text} font-barlow-condensed text-xs font-semibold tracking-[0.35em] uppercase block mb-4`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className="font-barlow-condensed text-3xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.92] tracking-tight text-[var(--color-text)]"
      >
        {lineOne}
        <span className={`${color.text} block`}>{lineTwo}</span>
      </h2>
      <div className={`${color.bg} w-14 h-[3px] mx-auto mt-7`} />
    </div>
  );
}