import { Link } from "react-router-dom";
import { formatRupiah } from "../../utils/helpers";

interface Props {
  id: number;
  nama: string;
  harga: number;
  gambar: string;
}

const ProductCard = ({ id, nama, harga, gambar }: Props) => {
  const formattedHarga = formatRupiah(harga);

  return (
    <Link
      to={`/produk/${id}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:-translate-y-1 hover:border hover:border-primary hover:shadow-md"
    >
      <div className="relative aspect-square bg-gray-100">
        <img src={gambar} alt={nama} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-4">
        <h3 className="line-clamp-2 text-sm font-medium text-gray-900">
          {nama}
        </h3>

        <div className="mt-1">
          <span className="text-lg font-semibold text-gray-900">
            {formattedHarga}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
