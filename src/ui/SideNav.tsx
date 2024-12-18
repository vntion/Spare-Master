import {
  ArchiveBoxIcon,
  CreditCardIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "react-router-dom";

function SideNav() {
  const location = useLocation();
  const currLocation: string = location.pathname.replace("/admin/", "");

  return (
    <div className="border-r border-r-[#999]/30 bg-white p-4 dark:border-r-[#777]/10 dark:bg-[#161e2a] dark:text-white">
      <h1 className="mb-8 mt-4 text-center text-2xl font-bold dark:text-gray-100">
        Spare Master
      </h1>

      <nav className="sidenav">
        <ul>
          <li>
            <NavLink
              to="dashboard"
              className="flex items-center gap-2 rounded-md px-2 py-3"
            >
              <HomeIcon
                className={`size-5 ${currLocation === "dashboard" ? "text-primary" : ""}`}
              />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="pembelian"
              className="flex items-center gap-2 rounded-md px-2 py-3"
            >
              <CreditCardIcon
                className={`size-5 ${currLocation === "pembelian" ? "text-primary" : ""}`}
              />
              Pembelian
            </NavLink>
          </li>
          <li>
            <NavLink
              to="produk"
              className="flex items-center gap-2 rounded-md px-2 py-3"
            >
              <ArchiveBoxIcon
                className={`size-5 ${currLocation === "produk" ? "text-primary" : ""}`}
              />
              Produk
            </NavLink>
          </li>
          <li>
            <NavLink
              to="user"
              className="flex items-center gap-2 rounded-md px-2 py-3"
            >
              <UserGroupIcon
                className={`size-5 ${currLocation === "user" ? "text-primary" : ""}`}
              />
              User
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideNav;
