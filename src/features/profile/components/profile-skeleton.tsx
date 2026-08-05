const Pulse = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-2xl bg-primary-200 ${className}`} />
);

const navigationSkeletons = [
  "overview",
  "orders",
  "addresses",
  "account",
  "security",
];
const statSkeletons = ["orders", "active", "addresses", "spent"];
const orderSkeletons = ["first", "second", "third"];

const ProfileSkeleton = () => {
  return (
    <div
      aria-label="در حال آماده‌سازی حساب کاربری"
      className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]"
      role="status"
    >
      <aside className="rounded-4xl border border-primary-300 bg-white/80 p-5 shadow-blur-sm">
        <div className="flex items-center gap-3 border-b border-primary-200 pb-5">
          <Pulse className="size-14 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Pulse className="h-4 w-3/4" />
            <Pulse className="h-3 w-1/2" />
          </div>
        </div>
        <div className="mt-5 space-y-2">
          {navigationSkeletons.map((item) => (
            <Pulse className="h-11 w-full" key={item} />
          ))}
        </div>
      </aside>

      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {statSkeletons.map((item) => (
            <div
              className="rounded-4xl border border-primary-300 bg-white/80 p-5"
              key={item}
            >
              <Pulse className="mb-8 size-10 rounded-xl" />
              <Pulse className="mb-2 h-6 w-1/3" />
              <Pulse className="h-3 w-2/3" />
            </div>
          ))}
        </div>
        <div className="rounded-4xl border border-primary-300 bg-white/80 p-5 sm:p-7">
          <div className="mb-7 flex justify-between">
            <div className="space-y-2">
              <Pulse className="h-5 w-32" />
              <Pulse className="h-3 w-52" />
            </div>
            <Pulse className="h-9 w-24 rounded-full" />
          </div>
          <div className="space-y-3">
            {orderSkeletons.map((item) => (
              <Pulse className="h-20 w-full" key={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
