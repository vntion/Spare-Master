import Pagination from "../components/Pagination";
import ProdukRow from "../components/ProdukRow";
import RouteTitle from "../components/RouteTitle";
import { useData } from "../contexts/DataContext";
import { useToggleForm } from "../contexts/ToggleFormContext";

function Produk() {
  const { onSelectProduk, onToggleOpen } = useToggleForm();
  const { produk } = useData();

  const openForm = function () {
    onToggleOpen();
    onSelectProduk("Tambah");
  };

  return (
    <div className="flex h-full flex-col">
      <RouteTitle>Produk</RouteTitle>

      <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-[#999]/30">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_2fr_3fr_1.5fr_1fr] items-center border-b border-b-[#999]/30 py-3 font-semibold dark:text-white">
          <div></div>
          <div>Nama</div>
          <div>Deskripsi</div>
          <div>Harga</div>
          <div></div>
        </div>

        {/* Table Body */}
        <div className="flex flex-1 flex-col overflow-y-auto bg-white dark:bg-[#161e2a]">
          <Pagination msg="produk">
            {produk.map((item, i) => (
              <ProdukRow produk={item} key={i} />
            ))}
          </Pagination>
        </div>
      </div>

      <button
        onClick={openForm}
        className="mt-3 self-start rounded-md bg-primary px-3 py-2 text-white"
      >
        Tambah produk
      </button>
    </div>
  );
}

export default Produk;
