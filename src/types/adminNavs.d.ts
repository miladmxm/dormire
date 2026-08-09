import type { ClassValue } from "clsx";
import type { Route } from "next";

export type Icon = FC<{ className?: ClassValue }>;
export interface AdminNavItemWithSubMenu {
  title: string;
  icon: Icon;
  base: Route;
  haveChild: true;
  items: { title: string; url: Route }[];
  url?: undefined;
}
export interface AdminNavItem {
  title: string;
  url: Route;
  icon: Icon;
  haveChild: boolean;
  testId?: string;
  items?: undefined;
}
export type AdminNavMain = AdminNavItem | AdminNavItemWithSubMenu;
