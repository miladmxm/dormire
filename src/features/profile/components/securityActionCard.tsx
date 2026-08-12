import type { LucideIcon } from "lucide-react";

const SecurityActionCard = ({
  action,
  actionLabel,
  description,
  disabled,
  icon: Icon,
  title,
}: {
  action: () => Promise<void> | void;
  actionLabel: string;
  description: string;
  disabled?: boolean;
  icon: LucideIcon;
  title: string;
}) => (
  <div className="rounded-4xl border border-primary-300 bg-white p-5 sm:p-7">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <div className="flex items-start gap-4">
        <div className="center size-12 shrink-0 rounded-2xl bg-thready-200 text-thready-900">
          <Icon className="size-5" />
        </div>
        <div>
          <h3 className="font-black text-gray-900">{title}</h3>
          <p className="mt-1 text-xs leading-6 text-primary-900">
            {description}
          </p>
        </div>
      </div>
      <button
        className="shrink-0 rounded-full border border-primary-500 px-5 py-2.5 text-xs font-bold text-gray-900 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-50"
        disabled={disabled}
        onClick={action}
        type="button"
      >
        {actionLabel}
      </button>
    </div>
  </div>
);

export default SecurityActionCard;
