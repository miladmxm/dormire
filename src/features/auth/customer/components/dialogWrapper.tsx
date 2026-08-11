import type { PropsWithChildren } from "react";

import Dialog from "@/components/ui/dialog";

import { closeAuthDialog, useAuthStore } from "../store/auth";

const DialogWrapper = ({
  title,
  children,
  forceOpen = false,
}: PropsWithChildren<{ forceOpen?: boolean; title: string }>) => {
  const isOpen = useAuthStore((state) => state.isOpenAuthDialog);

  return (
    <Dialog
      dismissible={!forceOpen}
      isOpen={forceOpen || isOpen}
      onClose={closeAuthDialog}
      title={title}
    >
      {children}
    </Dialog>
  );
};

export default DialogWrapper;
