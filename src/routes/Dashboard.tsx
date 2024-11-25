import { useData } from "../contexts/DataContext";

function Dashboard() {
  const { totalPembelian, totalProduk, totalUser } = useData();

  return (
    <>
      <h1 className="mb-7 text-4xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 grid-rows-[13rem] gap-6 *:rounded-md">
        <div className="grid grid-cols-1 bg-orange-600 p-4 text-white">
          <h4 className="text-xl font-medium">Jumlah produk</h4>
          <div className="justify-self-center text-center text-8xl font-bold">
            {totalProduk}
          </div>
        </div>

        <div className="grid grid-cols-1 bg-blue-500 p-4 text-white">
          <h4 className="text-xl font-medium">Jumlah pembelian</h4>
          <div className="justify-self-center text-center text-8xl font-bold">
            {totalPembelian}
          </div>
        </div>

        <div className="grid grid-cols-1 bg-indigo-500 p-4 text-white">
          <h4 className="text-xl font-medium">Jumlah user</h4>
          <div className="justify-self-center text-center text-8xl font-bold">
            {totalUser}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
