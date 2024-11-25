import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CheckCircleIcon className="size-32 text-green-500" />
      <h1 className="text-5xl font-bold">Terima kasih atas pembelian anda!</h1>
      <p className="mb-8 mt-2 max-w-[30rem] text-center text-[#555]">
        Pesanan Anda telah diterima dan sedang diproses. Anda akan segera
        menerima email konfirmasi berisi detail pesanan Anda.
      </p>
      <button
        onClick={() => {
          navigate("/", {
            replace: true,
          });
        }}
        className="rounded bg-primary px-12 py-3 text-white"
      >
        Beli lagi
      </button>
    </div>
  );
}

export default ThankYou;
