import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProdukByQuery } from "../../services/apiProduk";
import { CustomError } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import ProdukCard from "./ProdukCard";

function SearchedProduk() {
  const [searchedProduk, setSearchedProduk] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { query } = useParams();

  useEffect(() => {
    const fetchData = async function () {
      try {
        setIsLoading(true);
        const data = await getProdukByQuery(String(query));
        setSearchedProduk(data);
        setError("");
      } catch (err) {
        if (err instanceof CustomError) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="mx-auto max-w-[80rem]">
      <p className="mb-4 text-2xl">Hasil pencarian dari: {query}</p>

      <div className="grid grid-cols-4 gap-6">
        {isLoading && <Spinner />}
        {error && (
          <p className="col-span-full text-center font-bold">{error}</p>
        )}
        {!isLoading &&
          !error &&
          searchedProduk.map((produk) => (
            <ProdukCard
              key={produk.id}
              id={Number(produk.id)}
              nama={produk.nama}
              harga={Number(produk.harga)}
              gambar={produk.gambar}
            />
          ))}
      </div>
    </div>
  );
}

export default SearchedProduk;
