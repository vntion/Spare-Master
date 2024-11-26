import Footer from "../ui/Footer";
import NavBar from "../ui/NavBar";
import ProdukDetailCard from "../components/produk/ProdukDetailCard";

function ProdukDetail() {
  return (
    <>
      <NavBar />
      <main className="mb-8 flex-1 px-[2vw] py-5">
        <ProdukDetailCard />
      </main>
      <Footer />
    </>
  );
}

export default ProdukDetail;
