import { ReactNode, useCallback } from "react";
import { ConfirmationModal, Modal } from "../components/Modal";
import { ModalProps } from "../types";
import useModal from "./useModal";

type ConfirmationModalPropType = {
  primaryActionText?: string;
  secondaryActionText?: string;
  title: string | ReactNode;
  subtitle: string | ReactNode;
  children: ReactNode;
  action?: "delete" | "confirm";
  onConfirm: () => Promise<void>;
  onDeny?: () => void;
};

type UseModalServiceReturnType = {
  confirmAction: (options: ConfirmationModalPropType) => Promise<void>;
  showModal: (options: ModalProps) => void;
  closeModal: () => void;
};

function useModalService(): UseModalServiceReturnType {
  const { closeModal, openModal } = useModal();

  const handleConfirmAction = useCallback(
    (modal: ConfirmationModalPropType) => {
      return new Promise<boolean>((resolve, reject) => {
        const {
          primaryActionText,
          secondaryActionText,
          children,
          title,
          subtitle,
          action,
        } = modal;
        openModal(
          <ConfirmationModal
            title={title}
            subtitle={subtitle}
            primaryActionText={primaryActionText}
            secondaryActionText={secondaryActionText}
            onNo={() => {
              reject(false);
              closeModal();
            }}
            onYes={() => {
              resolve(true);
              closeModal();
            }}
            action={action}
          >
            {children}
          </ConfirmationModal>
        );
      });
    },
    [openModal, closeModal]
  );

  const confirmAction = useCallback(
    async (options: ConfirmationModalPropType) => {
      try {
        const confirm = await handleConfirmAction(options);
        if (confirm) {
          if (options.onConfirm) {
            await options.onConfirm();
          }
        }
      } catch (error) {
        console.log("Confirmation Rejected!", error);
        if (options.onDeny) {
          options.onDeny();
        }
      }
    },
    [handleConfirmAction]
  );

  const showModal = useCallback(
    (options: ModalProps) => {
      const { children, ...rest } = options;
      openModal(<Modal {...rest}>{children}</Modal>);
    },
    [openModal]
  );

  return {
    confirmAction,
    showModal,
    closeModal,
  };
}
export default useModalService;
