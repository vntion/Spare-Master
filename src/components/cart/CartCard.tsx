import { MapPinIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CustomError, formatRupiah, formatString } from "../../utils/helpers";
import { deleteCartById } from "../../services/apiCart";
import { Cookies } from "react-cookie";
import { decrypt } from "../../utils/session";

function CartCard({ product, onDelete }) {
  const { id, gambar, nama, harga, quantity, alamat } = product;

  const formattedHarga = formatRupiah(Number(harga));
  const formattedTotalHarga = formatRupiah(Number(harga) * Number(quantity));
  const formattedAlamat = formatString(alamat, 40);

  const handleDeleteCart = async function () {
    try {
      const confirm = window.confirm(
        "Apakah Anda yakin menghapus cart " + nama,
      );

      if (!confirm) return;
      const cookies = new Cookies().get("auth");
      const session = await decrypt(cookies);

      if (!session) return;
      await deleteCartById(session.akun.id, id);

      onDelete(id);
    } catch (err) {
      if (err instanceof CustomError) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="mb-4 flex w-full items-center rounded-lg bg-white p-4 shadow-sm">
      <img
        src={gambar}
        alt={nama}
        className="mr-4 h-24 w-24 rounded-md object-cover"
      />

      <div className="flex-grow">
        <h4 className="text-lg font-semibold text-gray-800">{nama}</h4>
        <p className="text-gray-600">{formattedHarga}</p>
        <div className="mt-2 flex items-center">
          <span className="mr-4 text-sm text-gray-500">Qty: {quantity}</span>
          <button
            onClick={handleDeleteCart}
            className="rounded-full p-1.5 text-red-500 hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 border-t pt-2">
          <p className="flex items-center text-sm text-gray-500">
            <MapPinIcon className="size-4" />
            <span className="align-middle">{formattedAlamat}</span>
          </p>
        </div>
      </div>

      <div className="basis-32 text-right">
        <p className="font-bold text-gray-800">{formattedTotalHarga}</p>
      </div>
    </div>
  );
}

export default CartCard;
