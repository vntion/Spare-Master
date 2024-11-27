import RouteTitle from "../ui/RouteTitle";
import Stat from "../ui/Stat";
import { useData } from "../contexts/DataContext";
import ChartPembelian from "../components/pembelian/ChartPembelian";

function Dashboard() {
  const { totalPembelian, totalProduk, totalUser } = useData();

  return (
    <>
      <RouteTitle>Dashboard</RouteTitle>

      <div className="grid grid-cols-3 grid-rows-[13rem] gap-6 *:rounded-md">
        <Stat title="Jumlah produk" value={totalProduk} color="orange" />
        <Stat title="Jumlah pembelian" value={totalPembelian} color="blue" />
        <Stat title="Jumlah user" value={totalUser} color="indigo" />
      </div>

      <ChartPembelian />
    </>
  );
}

export default Dashboard;
