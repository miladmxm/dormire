import type { FC, PropsWithChildren } from "react";

import { redirect } from "next/navigation";
import { Suspense } from "react";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/dashboard/ui/sidebar";
import { Skeleton } from "@/components/dashboard/ui/skeleton";
import { getSession } from "@/lib/auth";

const sidebarFallbackRows = [
  "dashboard",
  "blog",
  "products",
  "comments",
  "orders",
  "media",
  "portfolio",
];

const AuthenticatedSidebar = async () => {
  const userSession = await getSession();
  if (!userSession) redirect("/admin/login");

  return (
    <AppSidebar user={userSession.user} variant="inset" collapsible="icon" />
  );
};

const SidebarFallback = () => (
  <Sidebar collapsible="offcanvas" side="right" variant="inset">
    <SidebarHeader>
      <Skeleton className="h-12 w-full" />
    </SidebarHeader>
    <SidebarContent className="p-3">
      <div className="flex flex-col gap-3">
        {sidebarFallbackRows.map((row) => (
          <Skeleton className="h-9 w-full" key={row} />
        ))}
      </div>
    </SidebarContent>
    <SidebarFooter>
      <Skeleton className="h-12 w-full" />
    </SidebarFooter>
  </Sidebar>
);

const SidebarWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Suspense fallback={<SidebarFallback />}>
        <AuthenticatedSidebar />
      </Suspense>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarWrapper;
