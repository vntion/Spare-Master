import { Outlet } from "react-router-dom";

import SideNav from "../ui/SideNav";
import Overlay from "../ui/Overlay";
import ProdukForm from "../components/produk/ProdukForm";
import AdminHeader from "../components/akun/AdminHeader";

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
      <Overlay />
    </div>
  );
}

export default AdminLayout;
