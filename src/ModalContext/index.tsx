import { ReactNode, useCallback, useMemo, useState } from "react";
import { ModalContext } from "./context";

type ModalStateType = {
  isOpen: boolean;
  children: ReactNode | null;
};

function ModalContextProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalStateType>({
    isOpen: false,
    children: null,
  });

  const showModal = useMemo(
    () => modal.isOpen && modal.children,
    [modal.isOpen, modal.children]
  );

  const openModal = useCallback((children: ReactNode | null) => {
    setModal({
      isOpen: true,
      children,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModal({
      isOpen: false,
      children: null,
    });
  }, []);

  const contextValue = useMemo(() => {
    return {
      openModal,
      closeModal,
      isOpen: modal.isOpen,
    };
  }, [closeModal, openModal, modal.isOpen]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {showModal ? modal.children : null}
    </ModalContext.Provider>
  );
}

export default ModalContextProvider;
