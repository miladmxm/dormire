"use client";

import type { ComponentProps } from "react";

import dynamic from "next/dynamic";

const Dialog = dynamic(() => import("@/components/ui/dialog/dialog"), {
  ssr: false,
});

export default (props: ComponentProps<typeof Dialog>) => <Dialog {...props} />;
