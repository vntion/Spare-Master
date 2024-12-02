import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import CartCard from "./CartCard";
import { deleteAllCart, getCartByAkunId } from "../../services/apiCart";
import { Cookies } from "react-cookie";
import { decrypt } from "../../utils/session";
import { CustomError } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { CreatePembelian } from "../../utils/interfaces";
import { createPembelian } from "../../services/apiPembelian";

// CartList Component
function CartList() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleDeleteProduct = (id: string) => {
    setCart((cart) => cart.filter((cur) => cur.id !== id));
  };

  const handleClearCart = async () => {
    const confirm = window.confirm(
      "Apakah anda yakin ingin menghapus semua keranjang?",
    );

    if (!confirm) return;

    const cookie = new Cookies().get("auth");
    const session = await decrypt(cookie);

    if (!session) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      await deleteAllCart(session.akun.id);
      setCart([]);
    } catch (err) {
      if (err instanceof CustomError) {
        alert(err.message);
      }
    }
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) =>
        total + Number(product.harga) * Number(product.quantity),
      0,
    );
  };

  const buyAllCart = async function () {
    try {
      const cookie = new Cookies().get("auth");
      const session = await decrypt(cookie);

      if (!session) {
        navigate("/login", { replace: true });
        return;
      }

      const createPembelianArray: CreatePembelian[] = cart.map((item) => ({
        isPaid: true,
        totalHarga: Number(item.harga) * Number(item.quantity),
        alamat: item.alamat,
        produkId: item.produkId,
        jumlahProduk: item.quantity,
        akunId: session.akun.id,
      }));

      await Promise.all(
        createPembelianArray.map((pembelian) => createPembelian(pembelian)),
      );
      await deleteAllCart(session.akun.id);

      navigate("/thankyou");
      setCart([]);
    } catch (err) {
      if (err instanceof CustomError) {
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    const getCart = async function () {
      const cookies = new Cookies().get("auth");
      const session = await decrypt(cookies);

      if (!session) return;

      const data = await getCartByAkunId(session.akun.id);
      setCart(data);
    };

    getCart();
  }, []);

  return (
    <div className="w-full rounded-lg bg-[#F5F7FA] p-4">
      <h3 className="mb-6 text-2xl font-bold text-gray-800">Keranjang kamu</h3>

      {cart.length === 0 ? (
        <div className="rounded-lg bg-white py-8 text-center shadow-sm">
          <p className="text-gray-500">Keranjang kosong</p>
        </div>
      ) : (
        <>
          <div className="mb-6 max-h-[30rem] space-y-4 overflow-auto">
            {cart.map((cart) => (
              <CartCard
                key={cart.id}
                product={cart}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>

          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
            <div>
              <p className="text-gray-600">Total Belanja</p>
              <p className="text-2xl font-bold text-gray-800">
                Rp {calculateTotal().toLocaleString()}
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleClearCart}
                className="flex items-center space-x-2 rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
              >
                <TrashIcon className="h-5 w-5" />
                <span>Hapus Semua</span>
              </button>

              <button
                onClick={buyAllCart}
                className="flex items-center space-x-2 rounded-md bg-[#1782cf] px-4 py-2 text-white transition-colors hover:bg-opacity-90"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Beli Semua</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartList;
