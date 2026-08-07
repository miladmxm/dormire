"use client";

/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { PropsWithChildren } from "react";

import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

import Close from "@/assets/icons/close.svg";

const Dialog = ({
  onClose,
  title,
  children,
  isOpen,
}: PropsWithChildren<{
  onClose: () => void;
  title: string;
  isOpen: boolean;
}>) => {
  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed z-50 inset-0 center"
        >
          <div
            className="inset-0 cursor-pointer backdrop-blur-xs absolute -z-10"
            onClick={onClose}
          />
          <div className="bg-white shadow-sm-gray w-[95%] max-w-lg rounded-6xl overflow-hidden max-h-[95svh] flex flex-col">
            <header className="bg-primary-50 p-6 flex items-center justify-between">
              <h5 className="font-bold md:text-lg"> {title}</h5>
              <button
                type="button"
                className="size-3 *:size-full"
                onClick={onClose}
              >
                <Close />
              </button>
            </header>
            {children}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};

export default Dialog;
