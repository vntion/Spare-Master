function Hero() {
  return (
    <section className="relative flex flex-col items-center gap-1 border-b border-b-[#999]/60 bg-black/50 py-44 text-center text-white">
      <h4 className="spacing -translate-y-1 tracking-wider">#Home</h4>
      <h3 className="max-w-[41rem] -translate-y-1 text-4xl font-bold leading-[50px] tracking-wider">
        Temukan Suku Cadang Terbaik untuk Kendaraan Anda Tetap Prima
      </h3>

      <img
        alt="hero"
        src="../Hero.png"
        className="absolute top-0 -z-10 size-full object-fill object-center"
      />

      <a href="#main">Start</a>
    </section>
  );
}

export default Hero;
