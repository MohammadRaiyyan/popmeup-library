import { useContext } from "react";
import { ModalContext } from "../ModalContext/context";

export default function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Modal service must be used within a ModalProvider");
  }
  return context;
}
