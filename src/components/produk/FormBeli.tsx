import { useState } from "react";
import { Cookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { createCart } from "../../services/apiCart";
import { decrypt } from "../../utils/session";
import { useToast } from "@/hooks/use-toast";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ToastAction } from "../ui/toast";

interface Props {
  id: number;
}

function FormBeli({ id }: Props) {
  const [jumlah, setJumlah] = useState<number>(1);
  const [alamat, setAlamat] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

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

    const akunId: number = Number(session.akun.id);

    const newCart = {
      produkId: id,
      akunId,
      alamat,
      quantity: jumlah,
    };

    try {
      await createCart(newCart);
    } catch (err) {
      console.error(err);
      return;
    }
    toast({
      description: (
        <div className="flex items-center gap-1">
          <CheckCircleIcon className="size-8 text-green-500" />
          <p className="text-xs">Produk berhasil disimpan di keranjang</p>
        </div>
      ),
      action: (
        <ToastAction
          altText="Lihat keranjang"
          className="overflow-hidden rounded border-0 bg-primary p-0 text-white hover:bg-primary"
        >
          <Link
            to="/cart"
            className="size-full content-center rounded px-2 text-sm"
          >
            Lihat keranjang
          </Link>
        </ToastAction>
      ),
    });
    setAlamat("");
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
        Tambah ke keranjang
      </button>
    </form>
  );
}

export default FormBeli;
