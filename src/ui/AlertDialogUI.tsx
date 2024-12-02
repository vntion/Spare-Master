import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

interface Props {
  openDialog: ReactNode;
  cancel: string;
  continueText: string;
  title: string;
  description: string;
  onContinue: () => void;
}

function AlertDialogUI({
  openDialog,
  title,
  description,
  cancel,
  continueText,
  onContinue,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{openDialog}</AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="dark:text-gray-500">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="d dark dark:border-[#777]/30 dark:bg-transparent dark:text-gray-600 dark:hover:bg-gray-100 dark:hover:text-gray-600">
            {cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onContinue}
            className="bg-red-500 hover:bg-red-700 dark:bg-red-500 dark:text-white dark:hover:bg-red-700"
          >
            {continueText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogUI;
