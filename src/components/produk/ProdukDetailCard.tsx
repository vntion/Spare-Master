import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProdukById } from "../../services/apiProduk";
import { CustomError, formatRupiah } from "../../utils/helpers";
import { Produk } from "../../utils/interfaces";
import BackButton from "../../ui/BackButton";
import FormBeli from "./FormBeli";
import Spinner from "../../ui/Spinner";

function ProdukDetailCard() {
  const [produk, setProduk] = useState<Produk>({});
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();

  const { nama, deskripsi, harga, gambar } = produk;

  useEffect(() => {
    const fetchData = async function () {
      try {
        setIsLoading(true);
        const produk = await getProdukById(Number(id));
        setProduk(produk);
      } catch (err) {
        if (err instanceof CustomError) setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="mx-auto max-w-[80rem]">
      {isLoading && <Spinner />}
      {error && <p>{error}</p>}
      {!error && !isLoading && (
        <>
          <BackButton />
          <h4 className="mb-5 mt-3 text-5xl">{nama}</h4>
          <div className="grid grid-cols-2 gap-7">
            <img
              src={gambar}
              alt={nama}
              className="h-[38rem] w-full rounded-md object-cover object-center"
            />
            <div className="flex flex-col">
              <h6 className="mb-2 text-2xl font-semibold">Deskripsi</h6>
              <p className="max-h-52 overflow-y-auto text-justify text-gray-600">
                {deskripsi}
              </p>
              <span className="mb-auto mt-6 inline-block text-5xl font-medium">
                {formatRupiah(Number(harga))}
              </span>
              <FormBeli harga={Number(harga)} id={Number(id)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProdukDetailCard;
