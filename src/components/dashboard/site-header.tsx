import { Suspense } from "react";

import { Separator } from "@/components/dashboard/ui/separator";
import { SidebarTrigger } from "@/components/dashboard/ui/sidebar";
import { Skeleton } from "@/components/dashboard/ui/skeleton";

import RouteBreadcrumb from "./route-breadcrumb";
import { ModeToggle } from "./ThemeSwitch";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-me-1" />
        <ModeToggle />
        <Separator
          className="mx-2 data-[orientation=vertical]:h-4"
          orientation="vertical"
        />
        <Suspense fallback={<Skeleton className="h-5 w-32" />}>
          <RouteBreadcrumb />
        </Suspense>
      </div>
    </header>
  );
}
