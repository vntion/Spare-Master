import { useEffect, useState } from "react";
import { useToggleForm } from "../../contexts/ToggleFormContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CreateProduk, UpdateProduk } from "../../utils/interfaces";
import { createProduk, updateProduk } from "../../services/apiProduk";
import { CustomError } from "../../utils/helpers";
import { useData } from "../../contexts/DataContext";

function ProdukForm() {
  const { selectedProduk, isOpen, onCloseForm } = useToggleForm();
  const { onAddProduk, onEditProduk } = useData();

  const [nama, setNama] = useState<string>("");
  const [harga, setHarga] = useState<string | number>("");
  const [deskripsi, setDeskripsi] = useState<string>("");
  const [gambar, setGambar] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetInput = function () {
    setNama("");
    setHarga("");
    setDeskripsi("");
    setGambar("");
  };

  const handleSubmit = async function (e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nama || !harga || !deskripsi || !gambar) return;

    const produk: CreateProduk = {
      nama,
      harga: Number(harga),
      deskripsi,
      gambar,
    };

    if (selectedProduk?.action === "Tambah") {
      try {
        const res = await createProduk(produk);
        onAddProduk(res);
        onCloseForm();
        resetInput();
        return;
      } catch (err) {
        if (err instanceof CustomError) {
          setError(err.message);
          return;
        }
      }
    }

    if (selectedProduk?.action === "Edit") {
      try {
        const data: UpdateProduk = {
          nama,
          harga: Number(harga),
          deskripsi,
          gambar,
        };
        await updateProduk(data, Number(selectedProduk.produk?.id));
        onEditProduk({
          id: selectedProduk.produk?.id,
          nama,
          harga,
          deskripsi,
          gambar,
        });
        onCloseForm();
        resetInput();
        return;
      } catch (err) {
        if (err instanceof CustomError) {
          setError(err.message);
          return;
        }
      }
    }
  };

  useEffect(() => {
    setNama(selectedProduk?.produk?.nama ?? "");
    setHarga(selectedProduk?.produk?.harga ?? "");
    setDeskripsi(selectedProduk?.produk?.deskripsi ?? "");
    setGambar(selectedProduk?.produk?.gambar ?? "");
  }, [
    selectedProduk?.produk?.nama,
    selectedProduk?.produk?.harga,
    selectedProduk?.produk?.deskripsi,
    selectedProduk?.produk?.gambar,
  ]);

  if (!isOpen) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute left-1/2 top-1/2 z-50 flex w-[34rem] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-md bg-white px-5 py-2 text-sm shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] [&>div:not(:nth-last-child(2))]:border-b"
    >
      <button className="absolute right-2" onClick={onCloseForm}>
        <XMarkIcon className="size-4" />
      </button>

      {error && (
        <p className="translate-y-4 text-center text-red-500">{error}</p>
      )}
      <div className="mt-3 grid grid-cols-[1fr_3fr] items-center gap-3 py-5">
        <label htmlFor="nama">Nama produk</label>
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          type="text"
          id="nama"
          autoComplete="off"
          className="rounded border border-[#999] px-2 py-2 outline-none"
        />
      </div>

      <div className="grid grid-cols-[1fr_3fr] items-center gap-3 py-5">
        <label htmlFor="harga">Harga produk</label>
        <input
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          min={0}
          type="number"
          id="harga"
          className="rounded border border-[#999] px-2 py-2 outline-none"
        />
      </div>

      <div className="grid grid-cols-[1fr_3fr] items-center gap-3 py-5">
        <label htmlFor="deskripsi">Deskripsi produk</label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          id="deskripsi"
          className="h-20 resize-none rounded border border-[#999] px-2 py-2 outline-none"
        ></textarea>
      </div>

      <div className="grid grid-cols-[1fr_3fr] items-center gap-3 py-5">
        {gambar && (
          <div className="col-span-2">
            <img
              src={gambar}
              alt={nama}
              className="h-44 w-64 rounded object-cover"
            />
          </div>
        )}
        <label htmlFor="gambar">Gambar produk</label>
        <input
          value={gambar}
          onChange={(e) => setGambar(e.target.value)}
          type="url"
          id="gambar"
          autoComplete="off"
          className="rounded border border-[#999] px-2 py-2 outline-none"
        />
      </div>

      <div className="mt-5 flex justify-end gap-3 border-none">
        <button
          onClick={onCloseForm}
          type="button"
          className="rounded border border-[#999] px-3 py-2 text-[#444] hover:bg-gray-100 hover:text-black"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded bg-primary px-3 py-2 text-white"
        >
          {selectedProduk?.action} produk
        </button>
      </div>
    </form>
  );
}

export default ProdukForm;
