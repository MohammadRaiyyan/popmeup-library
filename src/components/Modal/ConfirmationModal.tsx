import { ReactNode } from "react";
import useModal from "../../hook/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type ConfirmationModalProps = {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  children: ReactNode | string;
  onYes: () => void;
  onNo: () => void;
  primaryActionText?: string;
  secondaryActionText?: string;
  action?: "delete" | "confirm";
};
export default function ConfirmationModal({
  children,
  title,
  subtitle,
  onNo = () => {},
  onYes = () => {},
  primaryActionText,
  secondaryActionText,
  action = "confirm",
}: ConfirmationModalProps) {
  const { isOpen, closeModal } = useModal();
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-start justify-between gap-2">
          <div className="flex-col space-y-1.5">
            {" "}
            <DialogTitle>{title}</DialogTitle>
            {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
          </div>
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter>
          <button
            type="button"
            onClick={onNo}
            className="bg-gray-100 px-3 py-1 text-gray-800 font-medium rounded "
          >
            {secondaryActionText || "Cancel"}
          </button>
          <button
            type="button"
            onClick={onYes}
            className={`${
              action && action === "delete" ? "bg-red-500" : "bg-blue-500"
            } bg--50 px-3 py-1 text-white font-medium rounded `}
          >
            {primaryActionText || (action === "delete" ? "Delete" : "Continue")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
