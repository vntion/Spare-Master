import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import LogoutButton from "./LogoutButton";

function AdminHeader() {
  const { name } = useAuth();

  return (
    <header className="flex items-center justify-end gap-4 bg-white px-12 py-2">
      <div className="flex items-center gap-1">
        <UserCircleIcon className="size-6" />
        <span>{name?.split(" ")[0]}</span>
      </div>
      <LogoutButton />
    </header>
  );
}

export default AdminHeader;
