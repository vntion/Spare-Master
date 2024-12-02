import { useEffect, useState } from "react";
import RiyawatCard from "./RiyawatCard";
import { Pembelian } from "../../utils/interfaces";
import { Cookies } from "react-cookie";
import { decrypt } from "../../utils/session";
import { getPembelianByAkunId } from "../../services/apiPembelian";
import { useNavigate } from "react-router-dom";

function RiyawatList() {
  const [pembelian, setPembelian] = useState<Pembelian[]>([]);
  const navigate = useNavigate();

  const sortedPembelian = pembelian.sort(
    (a, b) => new Date(b.tanggalBeli) - new Date(a.tanggalBeli),
  );

  useEffect(() => {
    const fetchData = async function () {
      try {
        const cookie = new Cookies().get("auth");
        const session = await decrypt(cookie);

        if (!session) {
          navigate("/login", { replace: true });
          return;
        }

        const data = await getPembelianByAkunId(session.akun.id);

        setPembelian(data);
      } catch {
        console.error("something went wrong");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="p-4">
      <h3 className="mb-6 text-2xl font-bold text-gray-800">
        Riwayat Pembelian
      </h3>
      {sortedPembelian.length === 0 ? (
        <div className="rounded-lg bg-white py-8 text-center shadow-sm">
          <p className="text-gray-500">Belum ada pembelian</p>
        </div>
      ) : (
        <div className="mb-6 max-h-[60rem] space-y-4 overflow-auto">
          {sortedPembelian.map((item) => (
            <RiyawatCard key={item.id} pembelian={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RiyawatList;
