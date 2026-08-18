import {
  IconCamera,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import {
  BaggageClaim,
  Image,
  MessageCircle,
  ShoppingBag,
  Users,
} from "lucide-react";

import type { AdminNavMain } from "@/types/adminNavs";

export const NavDictionary: Record<string, string> = {
  admin: "داشبورد",
  blog: "مقالات",
  media: "مدیا",
  add: "افزودن",
  edit: "ویرایش",
  categories: "دسته بندی ها",
  products: "محصولات",
  options: "ویژگی ها",
  portfolio: "نمونه کار ها",
  orders: "سفارش‌ها",
  users: "کاربران",
};
export const navMain: AdminNavMain[] = [
  {
    title: "داشبورد",
    url: "/admin",
    icon: IconDashboard,
    haveChild: false,
  },
  {
    title: "وبلاگ",
    icon: IconListDetails,
    base: "/admin/blog",
    haveChild: true,
    items: [
      {
        title: "مشاهده همه",
        url: "/admin/blog",
      },
      {
        title: "افزودن",
        url: "/admin/blog/add",
      },
      {
        title: "دسته بندی ها",
        url: "/admin/blog/categories",
      },
    ],
  },
  {
    title: "محصولات",
    icon: IconListDetails,
    base: "/admin/products",
    haveChild: true,
    items: [
      {
        title: "مشاهده همه",
        url: "/admin/products",
      },
      {
        title: "افزودن",
        url: "/admin/products/add",
      },
      {
        title: "دسته بندی ها",
        url: "/admin/products/categories",
      },
      {
        title: "ویژگی ها",
        url: "/admin/products/options",
      },
    ],
  },
  {
    title: "نظرات",
    url: "/admin/comments",
    icon: MessageCircle,
    haveChild: false,
  },
  {
    title: "سفارش‌ها",
    url: "/admin/orders",
    icon: ShoppingBag,
    haveChild: true,
    testId: "orders-nav-link",
  },
  {
    haveChild: true,
    title: "مدیا",
    url: "/admin/media",
    icon: Image,
  },
  {
    haveChild: false,
    title: "کاربران",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "نمونه کار ها",
    haveChild: true,
    base: "/admin/portfolio",
    icon: BaggageClaim,
    items: [
      { title: "مشاهده همه", url: "/admin/portfolio" },
      { title: "افزودن", url: "/admin/portfolio/add" },
    ],
  },
];
export const AdminNavLinks = {
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};
