import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-black">
      <Image
        src="/images/banner.png"
        alt="Alkohol zabiera więcej niż daje"
        fill
        priority
        className="object-contain"
        sizes="100vw"
      />
    </main>
  );
}
