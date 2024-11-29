import { Link } from "react-router-dom";
import { formatRupiah, formatString } from "../../utils/helpers";

interface Props {
  id: number;
  nama: string;
  harga: number;
  gambar: string;
}

const ProductCard = ({ id, nama, harga, gambar }: Props) => {
  const formattedHarga = formatRupiah(harga);
  const formattedNama = formatString(nama, 20);

  return (
    <Link
      to={`/produk/${id}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:-translate-y-1 hover:border hover:border-primary hover:shadow-md"
    >
      <div className="relative aspect-square">
        <img src={gambar} alt={nama} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-4">
        <h3 className="text-sm font-medium text-gray-900">{formattedNama}</h3>

        <span className="text-lg font-semibold text-gray-900">
          {formattedHarga}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
