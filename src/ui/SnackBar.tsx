import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useSnackBar } from "../contexts/SnackBarContext";

function SnackBar() {
  const { closeSnackBar, isVisible, status, msg } = useSnackBar();

  useEffect(() => {
    setTimeout(closeSnackBar, 5100);
  }, [closeSnackBar]);

  if (!isVisible) return null;

  if (status === "success")
    return (
      <div className="snack-bar absolute z-50 flex items-center gap-1 rounded-md bg-green-300/60 p-2 text-gray-300 dark:bg-green-600">
        <CheckCircleIcon className="size-5 text-green-600 dark:text-green-800" />
        <span className="text-xs font-semibold text-green-600 dark:text-green-800">
          {msg}
        </span>
      </div>
    );

  if (status === "error")
    return (
      <div className="snack-bar absolute z-50 flex items-center gap-1 rounded-md bg-red-200 p-2">
        <XCircleIcon className="size-5 text-red-500" />
        <span className="text-xs font-semibold text-red-500">{msg}</span>
      </div>
    );

  return null;
}

export default SnackBar;
