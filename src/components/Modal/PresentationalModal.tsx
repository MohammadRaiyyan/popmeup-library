import useModal from "../../hook/useModal";
import { ModalProps } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const sizeClass: Record<ModalProps["size"], string> = {
  sm: "max-w-lg",
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  xxl: "max-w-7xl",
  xxxl: "max-w-[1440px]",
  fullWidth: "max-w-[95vw]",
};

function PresentationalModal({
  size,
  subtitle,
  title,
  titleSubtext,
  footerButtons,
  headerButtons,
  rightSection,
  children,
}: ModalProps) {
  const { isOpen, closeModal } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className={sizeClass[size]}>
        <DialogHeader>
          <div className="flex flex-1 flex-col space-y-1.5">
            <DialogTitle className="flex gap-2">
              {title}
              <DialogDescription className="text-xs font-normal  self-end">
                {" "}
                {titleSubtext}
              </DialogDescription>
            </DialogTitle>
            {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
          </div>
          <div>
            {rightSection}

            {headerButtons?.length && (
              <div className="flex items-center gap-3">
                {headerButtons.map((button, i) => {
                  const classes = `px-3 py-1  font-medium rounded ${button.className}`;
                  return (
                    <button
                      key={`${i}-button`}
                      type="button"
                      onClick={button.onClick}
                      className={classes}
                    >
                      {button.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </DialogHeader>
        <div>{children}</div>
        {footerButtons?.length && (
          <DialogFooter className="flex items-center justify-end gap-2">
            {footerButtons.map((button, i) => {
              const classes = `px-3 py-1  font-medium rounded ${button.className}`;
              return (
                <button
                  type="button"
                  key={`${i}-button`}
                  onClick={button.onClick}
                  className={classes}
                >
                  {button.title}
                </button>
              );
            })}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PresentationalModal;
