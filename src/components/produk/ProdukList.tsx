import { useEffect, useState } from "react";
import ProdukCard from "./ProdukCard";
import { CustomError } from "../../utils/helpers";
import { getAllProduk } from "../../services/apiProduk";

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProduk = async function () {
      try {
        const res = await getAllProduk();
        setProduk(res);
      } catch (err) {
        if (err instanceof CustomError) {
          setError(err.message);
        }
      }
    };
    getProduk();
  }, []);

  return (
    <section className="px-[2vw] py-16">
      <div className="mx-auto grid max-w-[80rem] grid-cols-4 gap-6">
        {error && <p>error</p>}
        {!error && (
          <>
            <h2 className="col-span-full mb-5 w-max justify-self-center border-b border-b-primary pb-1 text-3xl font-bold">
              Produk terbaik kami
            </h2>
            {produk.map((item) => (
              <ProdukCard
                key={item.id}
                id={Number(item.id)}
                nama={item.nama}
                harga={Number(item.harga)}
                gambar={item.gambar}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default ProdukList;
