import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CustomError, formatRupiah } from "../utils/helpers";
import { DataContextType, Pembelian, Produk, Akun } from "../utils/interfaces";
import { getAllProduk } from "../services/apiProduk";
import { getAllPembelian } from "../services/apiPembelian";
import { getAllAkun } from "../services/apiAkun";

interface Props {
  children: ReactNode;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

function DataProvider({ children }: Props) {
  const [produk, setProduk] = useState<Produk[]>([]);
  const [pembelian, setPembelian] = useState<Pembelian[]>([]);
  const [user, setUser] = useState<Akun[]>([]);

  const handleAddProduk = function (newProduk: Produk) {
    setProduk((cur) => [...cur, newProduk]);
  };

  const handleDeleteProduk = function (id: string) {
    setProduk((cur) => cur.filter((item) => item.id !== id));
  };

  const handleEditProduk = function (edittedProduk: Produk) {
    setProduk((cur) =>
      cur.map((item) => (item.id === edittedProduk.id ? edittedProduk : item)),
    );
  };

  const totalProduk: number = produk.length;
  const totalPembelian: string = formatRupiah(
    pembelian.reduce((acc, pembelian) => acc + Number(pembelian.totalHarga), 0),
  );
  const totalUser: number = user.length;

  useEffect(() => {
    const getProduk = async function () {
      const data = await getAllProduk();
      setProduk(data);
    };
    const getPembelian = async function () {
      const data = await getAllPembelian();
      setPembelian(data);
    };
    const getUser = async function () {
      const data = await getAllAkun();
      setUser(data);
    };

    getProduk();
    getPembelian();
    getUser();
  }, []);

  return (
    <DataContext.Provider
      value={{
        produk,
        pembelian,
        user,
        onAddProduk: handleAddProduk,
        onDeleteProduk: handleDeleteProduk,
        onEditProduk: handleEditProduk,
        totalProduk,
        totalPembelian,
        totalUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const value = useContext(DataContext);
  if (value === undefined)
    throw new CustomError("Data context was used outside provider");
  return value;
}

export { DataProvider, useData };
