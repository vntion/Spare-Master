import { Link } from "react-router-dom";
import { formatRupiah } from "../utils/helpers";

interface Props {
  id: number;
  nama: string;
  harga: number;
  gambar: string;
}

function ProdukCard({ id, nama, harga, gambar }: Props) {
  const formattedHarga = formatRupiah(harga);

  return (
    <Link
      to={`/produk/${id}`}
      className="overflow-hidden rounded-md border border-[#999]/50 bg-white"
    >
      <div className="flex flex-col">
        <div className="basis-64 overflow-hidden">
          <img
            src={gambar}
            alt={nama}
            className="h-full w-full object-cover transition-all"
          />
        </div>
        <div className="flex flex-col gap-1 px-3 py-2">
          <span className="text-bg">
            {nama.length > 30 ? nama.slice(0, 30) : nama}
          </span>
          <span className="font-bold">{formattedHarga}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProdukCard;
