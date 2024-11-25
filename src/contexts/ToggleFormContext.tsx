import { createContext, ReactNode, useContext, useState } from "react";
import { CustomError } from "../utils/helpers";
import {
  Produk,
  SelectedProduk,
  ToggleFormContextType,
} from "../utils/interfaces";
import { OpenForm } from "../utils/types";

interface Props {
  children: ReactNode;
}

const ToggleFormContext = createContext<ToggleFormContextType | undefined>(
  undefined,
);

function ToggleFormProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState<OpenForm>(false);
  const [selectedProduk, setSelectedProduk] = useState<SelectedProduk | null>(
    null,
  );
  const [isOpenAction, setIsOpenAction] = useState<boolean>(false);
  const [currOpenAct, setCurrOpenAct] = useState<number | null>(null);

  const handleSelectedProduk = function (
    action: "Tambah" | "Edit",
    produk?: Produk,
  ) {
    setSelectedProduk({ produk, action });
  };

  const handleResetProduk = function () {
    setSelectedProduk(null);
  };

  const handleToggleOpen = function () {
    setIsOpen((cur) => !cur);
  };

  const handleCloseForm = function () {
    setIsOpen(null);
    setSelectedProduk(null);
  };

  const handleOpenAction = function () {
    setIsOpenAction(true);
  };

  const handleCloseAction = function () {
    setIsOpenAction(false);
  };

  const handleCurrOpenAct = function (id: number | null) {
    setCurrOpenAct(id);
  };

  return (
    <ToggleFormContext.Provider
      value={{
        currOpenAct,
        isOpenAction,
        isOpen,
        selectedProduk,
        onToggleOpen: handleToggleOpen,
        onCloseForm: handleCloseForm,
        onSelectProduk: handleSelectedProduk,
        onResetProduk: handleResetProduk,
        onOpenAction: handleOpenAction,
        onCurrOpenAct: handleCurrOpenAct,
        onCloseAction: handleCloseAction,
      }}
    >
      {children}
    </ToggleFormContext.Provider>
  );
}

function useToggleForm() {
  const value = useContext(ToggleFormContext);
  if (value === undefined)
    throw new CustomError("Toggle form context was used outside provider");
  return value;
}

export { ToggleFormProvider, useToggleForm };
