import { format } from "date-fns";
import { Pembelian } from "../../utils/interfaces";
import { formatRupiah, formatString } from "../../utils/helpers";

interface Props {
  pembelian: Pembelian;
}

function PembelianRow({ pembelian }: Props) {
  const formattedDate = format(pembelian.tanggalBeli, "dd MMMM yyyy");
  const formattedTotalHarga = formatRupiah(Number(pembelian.totalHarga));
  const formattedAlamat = formatString(pembelian.alamat, 30);
  const formattedProduk = formatString(pembelian.produk, 20);
  const formattedPembeli = formatString(pembelian.pembeli, 20);
  const formattedEmail = formatString(pembelian.email, 25);

  return (
    <div className="grid grid-cols-[1.5fr_1.5fr_2fr_1.5fr_1fr_1.2fr] items-center p-3 text-sm dark:text-white">
      <div>{formattedProduk}</div>
      <div className="flex flex-col gap-1">
        <span>{formattedPembeli}</span>
        <span className="w-min rounded bg-primaryBg px-[0.2rem] py-[0.1rem] text-xs text-gray-600 dark:bg-[#0f1721] dark:text-gray-400">
          {formattedEmail}
        </span>
      </div>
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
