import { Card, CardContent, CardHeader } from "@/components/dashboard/ui/card";
import { Skeleton } from "@/components/dashboard/ui/skeleton";

const statsSkeletonIds = ["all", "pending", "paid", "delivered", "revenue"];
const tableSkeletonIds = ["head", "one", "two", "three", "four", "five"];
const detailSkeletonIds = ["status", "customer", "address"];

export const OrdersOverviewSkeleton = () => (
  <div className="flex flex-col gap-6" aria-label="در حال دریافت سفارش‌ها">
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {statsSkeletonIds.map((id) => (
        <Card key={id}>
          <CardHeader>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row">
        <Skeleton className="h-9 w-full lg:max-w-sm" />
        <Skeleton className="h-9 w-full lg:w-52" />
        <Skeleton className="h-9 w-full lg:ms-auto lg:w-28" />
      </div>
      <div className="rounded-md border p-4">
        <div className="flex flex-col gap-4">
          {tableSkeletonIds.map((id) => (
            <Skeleton className="h-10 w-full" key={id} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const OrderDetailsSkeleton = () => (
  <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-36 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    </div>
    <div className="flex flex-col gap-6">
      {detailSkeletonIds.map((id) => (
        <Card key={id}>
          <CardHeader>
            <Skeleton className="h-5 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-28 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
