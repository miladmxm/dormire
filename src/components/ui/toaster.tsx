"use client";

import type { ToasterProps } from "sonner";

import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group font-display!"
      theme="light"
      style={
        {
          "--normal-bg": "var(--white)",
          "--normal-text": "var(--primary-900)",
          "--normal-border": "var(--primary-50)",
          "--border-radius": "1rem",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export default Toaster;
