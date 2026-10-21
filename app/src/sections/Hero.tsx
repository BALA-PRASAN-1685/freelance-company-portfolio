
export default function Hero() {
  return (
    <section
      id="home"
      className="m-0 flex min-h-screen w-full items-center justify-center overflow-hidden bg-black p-0"
    >
      <video
        className="block h-full w-full object-contain"
        src="/assets/BTOP_NEXUS_Showcase.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="B TO P NEXUS brand showcase"
      />
    </section>
  );
}
