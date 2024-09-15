import { ReactNode } from "react";
export type ModalContextType = {
    openModal: (children: ReactNode | null) => void;
    closeModal: () => void;
    isOpen: boolean;
};


type ButtonsType = {
    title: string | ReactNode;
    className?: string;
    isDisabled?: boolean;
    isHidden?: boolean;
    onClick: () => void;
};

export type ModalProps = {
    size: "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "fullWidth";
    title: string | ReactNode;
    titleSubtext?: string | ReactNode;
    subtitle: string | ReactNode;
    rightSection?: ReactNode;
    headerButtons?: ButtonsType[];
    footerButtons?: ButtonsType[];
    children: ReactNode;
};