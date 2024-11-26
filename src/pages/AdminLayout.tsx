import { Outlet } from "react-router-dom";

import AdminHeader from "../components/akun/AdminHeader";
import ProdukForm from "../components/produk/ProdukForm";
import Overlay from "../ui/Overlay";
import SideNav from "../ui/SideNav";
import SnackBar from "../ui/SnackBar";

function AdminLayout() {
  return (
    <div className="relative grid flex-1 grid-cols-[15rem_1fr]">
      <SideNav />
      <div className="flex flex-col">
        <AdminHeader />
        <main className="flex-1 px-12 py-8 dark:bg-[#0f1721]">
          <Outlet />
        </main>
      </div>
      <ProdukForm />
      <SnackBar />
      <Overlay />
    </div>
  );
}

export default AdminLayout;
