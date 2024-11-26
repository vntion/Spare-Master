import Pagination from "../components/pagination/Pagination";
import ProdukRow from "../components/produk/ProdukRow";
import RouteTitle from "../ui/RouteTitle";
import { useData } from "../contexts/DataContext";
import { useToggleForm } from "../contexts/ToggleFormContext";
import Table from "../components/table/Table";
import TableHead from "../components/table/TableHead";
import TableBody from "../components/table/TableBody";

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

      <Table>
        <TableHead cols="produk">
          <div></div>
          <div>Nama</div>
          <div>Deskripsi</div>
          <div>Harga</div>
          <div></div>
        </TableHead>

        <TableBody>
          <Pagination msg="produk">
            {produk.map((item, i) => (
              <ProdukRow produk={item} key={i} />
            ))}
          </Pagination>
        </TableBody>
      </Table>

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
