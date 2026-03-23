import Image from "next/image";

export default function Home() {
  return (
    <main className="fixed inset-0 bg-black">
      <Image
        src="/images/banner.png"
        alt="Alkohol zabiera więcej niż daje"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
    </main>
  );
}
