import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import SideNav from "../components/SideNav";
import Overlay from "../components/Overlay";
import ProdukForm from "../components/ProdukForm";

function AdminLayout() {
  return (
    <div className="relative grid flex-1 grid-cols-[15rem_1fr]">
      <SideNav />
      <div className="flex flex-col">
        <AdminHeader />
        <main className="flex-1 px-12 py-8">
          <Outlet />
        </main>
      </div>
      <ProdukForm />
      <Overlay />
    </div>
  );
}

export default AdminLayout;
