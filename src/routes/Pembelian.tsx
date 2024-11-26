import Pagination from "../components/pagination/Pagination";
import PembelianRow from "../components/pembelian/PembelianRow";
import RouteTitle from "../ui/RouteTitle";
import { useData } from "../contexts/DataContext";

function Pembelian() {
  const { pembelian } = useData();

  return (
    <div className="flex h-full flex-col">
      <RouteTitle>Pembelian</RouteTitle>

      <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-[#999]/30">
        {/* Table Header */}
        <div className="grid grid-cols-[1.5fr_1.5fr_2fr_1.5fr_1fr_1.2fr] items-center gap-2 border-b border-b-[#999]/30 p-3 font-semibold dark:text-white">
          <div>Produk</div>
          <div>Pembeli</div>
          <div>Alamat</div>
          <div>Tanggal Beli</div>
          <div>Status</div>
          <div>Total harga</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-1 flex-col overflow-y-visible bg-white text-sm dark:bg-[#161e2a]">
          <Pagination msg="pembelian">
            {pembelian.map((item) => (
              <PembelianRow pembelian={item} key={item.totalHarga} />
            ))}
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default Pembelian;
