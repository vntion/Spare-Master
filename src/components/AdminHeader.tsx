import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import LogoutButton from "./LogoutButton";
import DarkModeToggle from "./DarkModeToggle";

function AdminHeader() {
  const { name } = useAuth();

  return (
    <header className="flex items-center justify-end gap-4 border-b border-b-[#999]/30 bg-white px-12 py-2 dark:border-b-[#777]/10 dark:bg-[#161e2a]">
      <div className="flex items-center gap-1 dark:text-white">
        <UserCircleIcon className="size-6" />
        <span>{name!.length > 20 ? name!.slice(0, 20) : name}</span>
      </div>
      <DarkModeToggle />
      <LogoutButton color="blue" />
    </header>
  );
}

export default AdminHeader;
