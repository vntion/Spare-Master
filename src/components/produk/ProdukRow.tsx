import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useToggleForm } from "../../contexts/ToggleFormContext";
import { formatRupiah, formatString } from "../../utils/helpers";
import { Produk } from "../../utils/interfaces";
import ProdukAction from "./ProdukAction";

interface Props {
  produk: Produk;
}

function ProdukRow({ produk }: Props) {
  const formattedDeskripsi = formatString(produk!.deskripsi, 40);
  const formattedNama = formatString(produk!.nama, 20);
  const { isOpenAction, currOpenAct, onOpenAction, onCurrOpenAct } =
    useToggleForm();

  const openAction = function () {
    onOpenAction();
    onCurrOpenAct(Number(produk.id));
  };

  return (
    <div className="relative grid grid-cols-[1fr_2fr_3fr_1.5fr_1fr] items-center text-sm dark:text-white">
      <img
        src={produk.gambar}
        alt={produk.nama}
        className="h-[3.2rem] w-[5.3rem] object-cover"
      />
      <div>{formattedNama}</div>
      <div className="text-sm">{formattedDeskripsi}</div>
      <div>{formatRupiah(Number(produk.harga))}</div>
      <div className="justify-self-end pr-3">
        <button onClick={openAction}>
          <EllipsisVerticalIcon className="size-6" />
        </button>
      </div>

      {isOpenAction && currOpenAct === Number(produk.id) && (
        <ProdukAction produk={produk} />
      )}
    </div>
  );
}

export default ProdukRow;
