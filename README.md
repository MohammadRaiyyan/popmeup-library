A lightweight React hook library to manage modal dialogs and confirmation modals with customizable actions. This library simplifies the process of handling modal dialogs, including confirmation dialogs, in React applications.

## Features

- Manage modals with ease using context.
- Show modals programmatically.
- Customizable confirmation dialogs with primary/secondary actions.
- Easy integration into React projects.

### Installation

Install the package via npm:

```bash
npm i popmeup
```

### Usage

1. Wrap your application with the ModalContextProvider.
   In your main application entry point (usually App.tsx or index.tsx), wrap your components with **`ModalContextProvider`** to enable modal management:

```typescript
import React from "react";
import ReactDOM from "react-dom";
import { ModalContextProvider } from "use-modal-service";
import App from "./App";

ReactDOM.render(
  <ModalContextProvider>
    <App />
  </ModalContextProvider>,
  document.getElementById("root")
);
```

2. Use **`useModalService`** to handle modal actions.
   In your components, you can now use the useModalService hook to open modals, show confirmation dialogs, or close modals.

```typescript
import React from "react";
import { useModalService } from "popmeup";

const MyComponent = () => {
  const { confirmAction, showModal, closeModal } = useModalService();

  const handleShowModal = () => {
    showModal({
      size: "md",
      title: "My Custom Modal",
      subtitle: "This is a customizable modal.",
      children: <p>Modal content goes here.</p>,
    });
  };

  const handleConfirmAction = async () => {
    try {
      await confirmAction({
        title: "Are you sure?",
        subtitle: "This action cannot be undone.",
        primaryActionText: "Confirm",
        secondaryActionText: "Cancel",
        onConfirm: async () => {
          console.log("Action confirmed!");
        },
        onDeny: () => {
          console.log("Action denied!");
        },
      });
    } catch (error) {
      console.error("Confirmation rejected!", error);
    }
  };

  return (
    <div>
      <button onClick={handleShowModal}>Show Modal</button>
      <button onClick={handleConfirmAction}>Show Confirmation Modal</button>
      <button onClick={closeModal}>Close Modal</button>
    </div>
  );
};

export default MyComponent;
```

### API

The **`useModalService`** return types:

```typescript
type UseModalService = {
  confirmAction: (options: ConfirmationModalPropType) => Promise<void>;
  showModal: (options: ModalProps) => void;
  closeModal: () => void;
};

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

type ModalProps = {
  size: "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "fullWidth";
  title: string | ReactNode;
  titleSubtext?: string | ReactNode;
  subtitle: string | ReactNode;
  rightSection?: ReactNode;
  headerButtons?: ButtonsType[];
  footerButtons?: ButtonsType[];
  children: ReactNode;
};
```

### License

MIT
