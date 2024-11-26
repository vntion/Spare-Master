import Pagination from "../components/pagination/Pagination";
import PembelianRow from "../components/pembelian/PembelianRow";
import RouteTitle from "../ui/RouteTitle";
import { useData } from "../contexts/DataContext";
import Table from "../components/table/Table";
import TableHead from "../components/table/TableHead";
import TableBody from "../components/table/TableBody";

function Pembelian() {
  const { pembelian } = useData();

  return (
    <div className="flex h-full flex-col">
      <RouteTitle>Pembelian</RouteTitle>

      <Table>
        <TableHead cols="pembelian">
          <div>Produk</div>
          <div>Pembeli</div>
          <div>Alamat</div>
          <div>Tanggal Beli</div>
          <div>Status</div>
          <div>Total harga</div>
        </TableHead>

        <TableBody>
          <Pagination msg="pembelian">
            {pembelian.map((item) => (
              <PembelianRow pembelian={item} key={item.totalHarga} />
            ))}
          </Pagination>
        </TableBody>
      </Table>
    </div>
  );
}

export default Pembelian;
