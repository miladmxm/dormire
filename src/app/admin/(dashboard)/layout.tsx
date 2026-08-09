import { Suspense } from "react";

import { SiteHeader } from "@/components/dashboard/site-header";
import SidebarWrapper from "@/features/auth/admin/components/sidebar";

const DashboardLayout = ({ children }: LayoutProps<"/admin">) => {
  return (
    <Suspense>
      <SidebarWrapper>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 p-4 lg:p-6">
            {children}
          </div>
        </div>
      </SidebarWrapper>
    </Suspense>
  );
};

export default DashboardLayout;
