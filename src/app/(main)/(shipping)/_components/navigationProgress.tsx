"use client";

import type { CSSProperties } from "react";

import SeparatorLine from "@/components/ui/separatorLine";
import { cn } from "@/lib/utils";

import { useShippingContext } from "../_store";

const NAVS = {
  cart: "لیست خرید",
  personalDetails: "مشخصات فردی",
  method: "روش ارسال",
  Payment: "پرداخت",
};
const NAV_KEYS = Object.keys(NAVS);
const NAV_VALUES = Object.values(NAVS);
const EACH_ITEM_WIDTH = 100 / NAV_KEYS.length;

const NavListItem = ({
  value,
  index,
  active,
}: {
  value: string;
  index: number;
  active: boolean;
}) => {
  return (
    <li className="flex items-center flex-col gap-6">
      <span
        className={cn(
          "rounded-2xl bg-white size-10 center font-bold shadow-sm-gray transition-all",
          {
            " ring-2 ring-success": active,
          },
        )}
      >
        {index}
      </span>
      <strong>{value}</strong>
    </li>
  );
};

const NavigationProgressContainer = () => {
  const activeIndex = useShippingContext((store) => store.step);
  return (
    <ul
      style={
        {
          "--cols": `repeat(${NAV_KEYS.length}, minmax(0, 1fr))`,
          "--before-width": `${EACH_ITEM_WIDTH * (activeIndex - 1)}%`,
          "--before-max-width": `${100 - EACH_ITEM_WIDTH}%`,
          "--before-right": `${EACH_ITEM_WIDTH / 2}%`,
        } as CSSProperties
      }
      className="grid grid-rows-1 grid-cols-(--cols) isolate relative before:h-1 before:w-(--before-width) before:absolute before:top-5 before:-translate-y-1/2 before:right-(--before-right) before:bg-success before:-z-10 before:transition-all"
    >
      <SeparatorLine
        size="4"
        className="absolute left-(--before-right) -z-20 w-(--before-max-width) top-5 -translate-y-1/2"
      />
      {NAV_KEYS.map((key, i) => (
        <NavListItem
          active={i + 1 <= activeIndex}
          key={key}
          index={i + 1}
          value={NAV_VALUES[i]}
        />
      ))}
    </ul>
  );
};

const NavigationProgress = () => {
  return (
    <nav className="container @container isolate relative">
      <div className="rounded-full h-16 bg-primary-200 w-full translate-y-5 -z-10 relative" />
      <NavigationProgressContainer />
    </nav>
  );
};

export default NavigationProgress;
