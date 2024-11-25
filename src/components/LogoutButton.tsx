import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { deleteSession } from "../utils/session";
import { useAuth } from "../contexts/AuthContext";

function LogoutButton() {
  const { onLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async function () {
    await deleteSession();
    onLogout();
    navigate("/");
  };

  return (
    <button onClick={handleLogout}>
      <ArrowRightStartOnRectangleIcon className="size-5" />
    </button>
  );
}

export default LogoutButton;
