import { format } from "date-fns";
import { Pembelian } from "../utils/interfaces";
import { formatRupiah } from "../utils/helpers";

interface Props {
  pembelian: Pembelian;
}

function PembelianRow({ pembelian }: Props) {
  const formattedDate = format(pembelian.createdAt, "dd MMMM yyyy");
  const formattedTotalHarga = formatRupiah(Number(pembelian.totalHarga));
  const formattedAlamat =
    pembelian.alamat.length > 30
      ? `${pembelian.alamat.slice(0, 30)}...`
      : pembelian.alamat;

  return (
    <div className="grid grid-cols-[1.1fr_2fr_2fr_1.5fr_1.2fr] items-center p-3">
      <div>{pembelian.produkId}</div>
      <div className="overflow-x-auto">{formattedAlamat}</div>
      <div>{formattedDate}</div>
      <div className="max-w-min rounded bg-green-500 px-2 py-1 font-semibold text-white">
        terbayar
      </div>
      <div>{formattedTotalHarga}</div>
    </div>
  );
}

export default PembelianRow;
