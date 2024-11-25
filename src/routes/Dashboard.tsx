import RouteTitle from "../components/RouteTitle";
import Stat from "../components/Stat";
import { useData } from "../contexts/DataContext";

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
    </>
  );
}

export default Dashboard;
