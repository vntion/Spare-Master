import {
  BanknotesIcon,
  CubeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import ChartPembelian from "../components/pembelian/ChartPembelian";
import { useData } from "../contexts/DataContext";
import RouteTitle from "../ui/RouteTitle";
import Stat from "../ui/Stat";

function Dashboard() {
  const { totalPembelian, totalProduk, totalUser } = useData();

  return (
    <>
      <RouteTitle>Dashboard</RouteTitle>

      <div className="grid grid-cols-3 gap-6 *:rounded-md">
        <Stat
          title="Jumlah produk"
          value={totalProduk}
          icon={<CubeIcon className="bg-indigo-500 p-3 text-white" />}
        />
        <Stat
          title="Total pembelian"
          value={totalPembelian}
          icon={<BanknotesIcon className="bg-blue-500 p-3 text-white" />}
        />
        <Stat
          title="Jumlah user"
          value={totalUser}
          icon={<UserGroupIcon className="bg-orange-500 p-3 text-white" />}
        />
      </div>

      <ChartPembelian />
    </>
  );
}

export default Dashboard;
