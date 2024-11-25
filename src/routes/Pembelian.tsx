import Pagination from "../components/Pagination";
import PembelianRow from "../components/PembelianRow";
import { useData } from "../contexts/DataContext";

function Pembelian() {
  const { pembelian } = useData();

  return (
    <div className="flex h-full flex-col">
      <h1 className="mb-7 text-4xl font-bold">Pembelian</h1>

      <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-[#999]/30">
        {/* Table Header */}
        <div className="grid grid-cols-[1.1fr_2fr_2fr_1.5fr_1.2fr] items-center border-b border-b-[#999]/30 p-3 font-semibold">
          <div>Produk</div>
          <div>Alamat</div>
          <div>Tanggal Beli</div>
          <div>Status</div>
          <div>Total harga</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-1 flex-col overflow-y-visible bg-white text-sm">
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
