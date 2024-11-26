import Footer from "../ui/Footer";
import Hero from "../ui/Hero";
import NavBar from "../ui/NavBar";
import ProdukList from "../components/produk/ProdukList";

function Home() {
  return (
    <>
      <NavBar />
      <main className="flex-1">
        <Hero />
        <ProdukList />
      </main>
      <Footer />
    </>
  );
}

export default Home;
