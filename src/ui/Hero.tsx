function Hero() {
  const scrollTo = function () {
    document.querySelector("#main")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col items-center gap-7 border-b border-b-[#999]/60 py-[11.5rem] text-center text-white">
      <h3 className="max-w-[48rem] -translate-y-1 text-4xl font-semibold leading-[45px] tracking-wider">
        Temukan Suku Cadang Terbaik untuk Kendaraan Anda Tetap Prima
      </h3>

      <img
        alt="hero"
        src="../Hero.jpg"
        className="absolute top-0 -z-10 size-full object-cover object-bottom brightness-[0.45]"
      />

      <button onClick={scrollTo} className="rounded-md bg-primary px-8 py-3">
        Mulai Belanja
      </button>
    </section>
  );
}

export default Hero;
