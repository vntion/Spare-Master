import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="group flex items-center"
      onClick={() => {
        navigate(-1);
      }}
    >
      <ArrowLongLeftIcon className="size-4 group-hover:text-gray-600" />
      <span className="group-hover:text-gray-600">Kembali</span>
    </button>
  );
}

export default BackButton;
