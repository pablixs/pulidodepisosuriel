interface SectionHeadingProps {
  eyebrow?: string;
  lineOne: string;
  lineTwo: string;
  acento?: "dorado" | "piedra" | "oxido";
}

const acentos = {
  dorado: { text: "text-[#fa9827]", bg: "bg-[#fa9827]" },
  piedra: { text: "text-[#7a8c7e]", bg: "bg-[#7a8c7e]" },
  oxido:  { text: "text-[#a85c3a]", bg: "bg-[#a85c3a]" },
};

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
        className="font-barlow-condensed font-black uppercase leading-[0.92] tracking-tight text-[#1a1714]"
        style={{ fontSize: "clamp(3.2rem, 8vw, 6.5rem)" }}
      >
        {lineOne}
        <span className={`${color.text} block`}>{lineTwo}</span>
      </h2>
      <div className={`${color.bg} w-14 h-[3px] mx-auto mt-7`} />
    </div>
  );
}