import { OpenForm, Role, SnackBarStatus } from "./types";

export interface CreatePembelian {
  isPaid: boolean;
  totalHarga: number;
  alamat: string;
  produkId: number;
  akunId: number;
}

export interface CreateProduk {
  nama: string;
  deskripsi: string;
  harga: number;
  gambar: string;
}

export interface UpdateProduk {
  nama: string;
  deskripsi: string;
  harga: number;
  gambar: string;
}

export interface Produk {
  id?: string;
  nama?: string;
  deskripsi?: string;
  harga?: number | string;
  gambar?: string;
}

export interface Pembelian {
  isPaid: string;
  alamat: string;
  totalHarga: string;
  produk: string;
  pembeli: string;
  email: string;
  tanggalBeli: string;
}

export interface ProdukActionProps {
  produk: Produk;
}

export interface SnackBarProps {
  isVisible: boolean;
  status: SnackBarStatus;
  msg: string;
  onCloseSnackBar: () => void;
}

export interface StatProps {
  title: string;
  value: number;
  color: "orange" | "blue" | "indigo";
}

export interface LogoutBtnProps {
  color: "blue" | "black";
}

export interface Akun {
  id: string;
  nama: string;
  email: string;
  password: string;
  role: Role;
}

export interface SignUp {
  nama: string;
  password: string;
  email: string;
  role: Role;
}

export interface SelectedProduk {
  produk: Produk | undefined;
  action: "Tambah" | "Edit";
}

export interface SessionPayload {
  akun: Akun;
  expiresAt: Date;
}

export interface Session {
  akun: Akun;
  expiresAt: Date;
  exp: number;
  iat: number;
}

export interface DataContextType {
  produk: Produk[];
  pembelian: Pembelian[];
  user: Akun[];
  onAddProduk: (newProduk: Produk) => void;
  onDeleteProduk: (id: string) => void;
  onEditProduk: (edittedProduk: Produk) => void;
  totalProduk: number;
  totalPembelian: number;
  totalUser: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  role: Role;
  name: string | null;
  isLoading?: boolean;
  onAuth: (isAuth: boolean) => void;
  onRole: (role: Role) => void;
  onName: (name: string) => void;
  onLogout: () => void;
}

export interface ToggleFormContextType {
  isOpen: OpenForm;
  isOpenAction: boolean;
  currOpenAct: number | null;
  selectedProduk: SelectedProduk | null;
  onToggleOpen: () => void;
  onCloseForm: () => void;
  onSelectProduk: (action: "Tambah" | "Edit", produk?: Produk) => void;
  onResetProduk: () => void;
  onCurrOpenAct: (id: number | null) => void;
  onOpenAction: () => void;
  onCloseAction: () => void;
}

export interface SnackBarContextType {
  isVisible: boolean;
  status: SnackBarStatus;
  msg: string;
  closeSnackBar: () => void;
  showSnackBar: () => void;
  onSnackBarStatus: (status: SnackBarStatus) => void;
  onSnackBarMsg: (msg: string) => void;
}
