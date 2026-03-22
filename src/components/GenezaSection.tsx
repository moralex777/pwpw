import { geneza } from "@/lib/content";

export default function GenezaSection() {
  const paragraphs = geneza.split("\n\n");

  return (
    <section id="geneza" className="bg-background py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/geneza.webp"
          alt="Winnica o zachodzie słońca"
          className="md:float-right md:ml-8 md:mb-4 md:w-[45%] rounded-lg shadow-2xl mb-8"
        />

        <div className="gold-divider mb-12" />

        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "font-serif text-xl md:text-2xl text-cream leading-relaxed"
                : "text-base md:text-lg text-cream/80 leading-relaxed mt-6"
            }
          >
            {paragraph}
          </p>
        ))}

        <div className="gold-divider mt-12" />
      </div>
    </section>
  );
}
