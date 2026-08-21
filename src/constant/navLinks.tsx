import type { Route } from "next";

export const STATIC_NAV_LINKS: { label: string; link: Route }[] = [
  {
    label: "پیشنهاد ویژه",
    link: "/",
  },
  {
    label: "وبلاگ",
    link: "/blog",
  },
  {
    label: "تماس با ما",
    link: "/contact-us",
  },
];
