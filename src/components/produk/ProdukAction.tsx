import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteProduk } from "../../services/apiProduk";
import { ProdukActionProps } from "../../utils/interfaces";
import { useData } from "../../contexts/DataContext";
import { useToggleForm } from "../../contexts/ToggleFormContext";
import AlertDialogUI from "@/ui/AlertDialogUI";

function ProdukAction({ produk }: ProdukActionProps) {
  const { onDeleteProduk } = useData();
  const { onCloseAction, onToggleOpen, onSelectProduk, onCurrOpenAct } =
    useToggleForm();

  const handleDeleteProduk = async function () {
    try {
      await deleteProduk(Number(produk.id));
      onDeleteProduk(String(produk.id));
      onCloseAction();
      onCurrOpenAct(null);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  const handleEditProduk = function () {
    onCloseAction();
    onCurrOpenAct(null);
    onToggleOpen();
    onSelectProduk("Edit", produk);
  };

  return (
    <div className="absolute right-8 top-3 z-[1000] flex flex-col rounded bg-white p-1 shadow-lg *:p-2 dark:text-black">
      <button
        onClick={handleEditProduk}
        className="flex gap-1 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-200"
      >
        <PencilSquareIcon className="size-5" />
        <span>Edit</span>
      </button>

      <AlertDialogUI
        openDialog={
          <button className="flex gap-1 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-200">
            <TrashIcon className="size-5" />
            <span>Hapus</span>
          </button>
        }
        onContinue={handleDeleteProduk}
        cancel="Batal"
        continueText="Hapus"
        title="Hapus produk"
        description="Apakah Anda yakin ingin menghapus produk ini secara permanen? Tindakan ini dapat dibatalkan."
      />
    </div>
  );
}

export default ProdukAction;
