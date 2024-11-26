import { useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { createPembelian } from "../../services/apiPembelian";
import { CreatePembelian } from "../../utils/interfaces";
import { decrypt } from "../../utils/session";

interface Props {
  harga: number;
  id: number;
}

function FormBeli({ harga, id }: Props) {
  const [jumlah, setJumlah] = useState<number>(1);
  const [alamat, setAlamat] = useState<string>("");
  const navigate = useNavigate();

  const handleTambahJml = function () {
    setJumlah((cur) => cur + 1);
  };

  const handleKurangJml = function () {
    if (jumlah === 1) return;
    if (jumlah <= 1) {
      setJumlah(1);
      return;
    }
    setJumlah((cur) => cur - 1);
  };

  const handleSubmit = async function (e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!jumlah || !alamat) return;

    const cookie = new Cookies().get("auth");
    const session = await decrypt(cookie);

    if (!session) {
      navigate("/login");
      return;
    }

    if (session.akun.role === "admin") {
      navigate("/login");
      return;
    }

    const totalHarga: number = harga * jumlah;
    const akunId: number = Number(session.akun.id);

    const newPembelian: CreatePembelian = {
      isPaid: true,
      totalHarga: totalHarga,
      alamat,
      produkId: id,
      akunId,
    };

    try {
      await createPembelian(newPembelian);
    } catch (err) {
      console.error(err);
      return;
    }
    navigate("/thankyou");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-wrap *:rounded">
        <label htmlFor="jumlah" className="mb-2 basis-full text-lg text-[#888]">
          Jumlah
        </label>
        <input
          id="jumlah"
          value={jumlah}
          onChange={(e) => {
            if (Number(e.target.value) <= 1) {
              setJumlah(1);
              return;
            }
            setJumlah(Number(e.target.value));
          }}
          type="number"
          required
          className="w-24 border border-[#999] bg-transparent px-2 py-2 text-center outline-none"
        />
        <button
          onClick={handleTambahJml}
          type="button"
          className="mx-2 border border-[#999] px-5"
        >
          +
        </button>
        <button
          onClick={handleKurangJml}
          type="button"
          className="border border-[#999] px-5"
        >
          -
        </button>
      </div>

      <div className="mb-1 flex flex-wrap">
        <label className="mb-2 basis-full text-lg text-[#888]" htmlFor="alamat">
          Alamat
        </label>
        <textarea
          id="alamat"
          value={alamat}
          onChange={(e) => {
            setAlamat(e.target.value);
          }}
          className="w-full resize-none rounded p-2 outline-none"
          placeholder="Masukkan alamat disini"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-primary py-4 text-white hover:bg-primary/90"
      >
        Beli produk
      </button>
    </form>
  );
}

export default FormBeli;
