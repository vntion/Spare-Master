import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { CustomError } from "../utils/helpers";
import { SnackBarContextType } from "../utils/interfaces";
import { SnackBarStatus } from "../utils/types";

interface Props {
  children: ReactNode;
}

const SnackBarContext = createContext<SnackBarContextType | undefined>(
  undefined,
);

function SnackBarProvider({ children }: Props) {
  const [isSnackBarVisible, setSnackBarVisible] = useState<boolean>(false);
  const [snackBarStatus, setSnackBarStatus] = useState<SnackBarStatus>(null);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");

  const showSnackBar = function () {
    setSnackBarVisible(false); // Reset state dulu
    setTimeout(() => {
      setSnackBarVisible(true);
    }, 0);
  };

  const closeSnackBar = useCallback(function closeSnackBar() {
    setSnackBarVisible(false);
    setSnackBarStatus(null);
    setSnackBarMsg("");
  }, []);

  const handleSnackBarStatus = function (status: SnackBarStatus) {
    setSnackBarStatus(status);
  };

  const handleSnackBarMsg = function (msg: string) {
    setSnackBarMsg(msg);
  };

  return (
    <SnackBarContext.Provider
      value={{
        isVisible: isSnackBarVisible,
        status: snackBarStatus,
        msg: snackBarMsg,
        showSnackBar,
        closeSnackBar,
        onSnackBarMsg: handleSnackBarMsg,
        onSnackBarStatus: handleSnackBarStatus,
      }}
    >
      {children}
    </SnackBarContext.Provider>
  );
}

function useSnackBar() {
  const value = useContext(SnackBarContext);
  if (value === undefined)
    throw new CustomError("Snack bar context was used outside provider");
  return value;
}

export { SnackBarProvider, useSnackBar };
