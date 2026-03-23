export default function Home() {
  return (
    <main className="fixed inset-0 bg-black">
      <picture>
        <source media="(max-width: 768px)" srcSet="/images/banner-mobile.webp" />
        <source media="(min-width: 769px)" srcSet="/images/banner.webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/banner.webp"
          alt="Alkohol zabiera więcej niż daje"
          className="h-full w-full object-cover"
        />
      </picture>
    </main>
  );
}
