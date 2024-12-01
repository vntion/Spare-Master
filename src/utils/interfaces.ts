import { ReactNode } from "react";
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

export interface UpdateAkunProps {
  id: string;
  nama?: string;
  password?: string;
  profile?: string;
}

export interface Pembelian {
  isPaid: string;
  alamat: string;
  totalHarga: string;
  jumlahProduk: string;
  gambarProduk: string;
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
  value: number | string;
  icon: ReactNode;
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
  profile: string;
}

export interface SignUp {
  nama: string;
  password: string;
  email: string;
  role: Role;
  profile: string;
}

export interface SelectedProduk {
  produk: Produk | undefined;
  action: "Tambah" | "Edit";
}

export interface DataPoint {
  bulan:
    | "Jan-Feb"
    | "Mar-Apr"
    | "Mei-Juni"
    | "Juli-Agst"
    | "Sep-Okt"
    | "Nov-Des";
  totalPembelian: number;
}

export interface SessionPayload {
  akun: SessionAkun;
  expiresAt: Date;
}

export interface SessionAkun {
  id: string;
  nama: string;
  email: string;
  role: Role;
  profile: string;
}

export interface Session {
  akun: SessionAkun;
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
  totalPembelian: string;
  totalUser: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  role: Role;
  name: string | null;
  isLoading?: boolean;
  profile: string;
  onProfile: (profile: string) => void;
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
