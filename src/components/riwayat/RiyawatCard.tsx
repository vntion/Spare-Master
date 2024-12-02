import { format } from "date-fns";
import { formatRupiah } from "../../utils/helpers";
import { Pembelian } from "../../utils/interfaces";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface Props {
  pembelian: Pembelian;
}

function RiyawatCard({ pembelian }: Props) {
  const {
    produk,
    gambarProduk,
    totalHarga,
    hargaProduk,
    jumlahProduk,
    tanggalBeli,
    produkId,
  } = pembelian;

  const formattedHarga = formatRupiah(Number(hargaProduk));
  const formattedTotalHarga = formatRupiah(Number(totalHarga));
  const formattedDate = format(tanggalBeli, "dd MMMM yyyy");

  return (
    <div className="mb-4 flex w-full items-center rounded-lg bg-white p-4 shadow-sm">
      <img
        src={gambarProduk}
        alt={produk}
        className="mr-4 h-24 w-24 rounded-md object-cover"
      />

      <div className="flex-grow">
        <span className="text-sm text-gray-500">{formattedDate}</span>
        <h4 className="text-lg font-semibold text-gray-800">{produk}</h4>
        <p className="text-gray-600">{formattedHarga}</p>
        <span className="mr-4 text-sm text-gray-500">Qty: {jumlahProduk}</span>

        <div className="mt-2 flex justify-end border-t pt-2">
          <Link
            to={`/produk/${produkId}`}
            className="flex items-center gap-1.5 rounded bg-primary p-2 text-sm font-medium text-white"
          >
            <ShoppingCartIcon className="size-4" />
            <span>Beli Lagi</span>
          </Link>
        </div>
      </div>

      <div className="basis-32 text-right">
        <p className="font-bold text-gray-800">{formattedTotalHarga}</p>
      </div>
    </div>
  );
}

export default RiyawatCard;
