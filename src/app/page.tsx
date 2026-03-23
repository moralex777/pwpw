export default function Home() {
  return (
    <main className="fixed inset-0 bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/banner.webp"
        className="h-full w-full object-cover hidden md:block"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/banner-mobile.webp"
        className="h-full w-full object-cover md:hidden"
      >
        <source src="/video-mobile.mp4" type="video/mp4" />
      </video>
    </main>
  );
}
