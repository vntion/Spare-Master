import SearchedProduk from "../components/produk/SearchedProduk";
import Footer from "../ui/Footer";
import NavBar from "../ui/NavBar";

function SearchProduk() {
  return (
    <>
      <NavBar />
      <main className="flex-1 px-[2vw] py-8">
        <SearchedProduk />
      </main>
      <Footer />
    </>
  );
}

export default SearchProduk;
