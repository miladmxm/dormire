"use client";

import { LogOut, MonitorSmartphone, ShieldCheck, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import TextField from "@/components/ui/auth/text";
import { authClient } from "@/lib/auth-client";

import ChangePassword from "./chagePassword";
import PasswordFieldWithLabel from "./passwordField";

const inputClassName =
  "mt-2 w-full rounded-2xl border border-primary-300 bg-primary-25 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-primary-600/60 focus:border-secondary-500 focus:bg-white focus:ring-4 focus:ring-secondary-500/10 disabled:cursor-not-allowed disabled:opacity-70";

const getErrorMessage = (error: { message?: string } | null) =>
  error?.message || "در انجام عملیات مشکلی پیش آمد؛ دوباره تلاش کنید.";

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
  icon: typeof LogOut;
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

const SessionCards = () => {
  const router = useRouter();
  const [isRevoking, setIsRevoking] = useState(false);

  const revokeOtherSessions = async () => {
    setIsRevoking(true);
    const { error } = await authClient.revokeOtherSessions();
    setIsRevoking(false);

    if (error) {
      toast.error(getErrorMessage(error));
      return;
    }

    toast.success("از تمام دستگاه‌های دیگر خارج شدید");
  };

  const signOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(getErrorMessage(error));
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <>
      <SecurityActionCard
        action={revokeOtherSessions}
        actionLabel={isRevoking ? "در حال خروج..." : "خروج از سایر دستگاه‌ها"}
        description="اگر دستگاهی را نمی‌شناسید، همه نشست‌ها به‌جز همین دستگاه را ببندید."
        disabled={isRevoking}
        icon={MonitorSmartphone}
        title="دستگاه‌های فعال"
      />
      <SecurityActionCard
        action={signOut}
        actionLabel="خروج"
        description="نشست این دستگاه پایان می‌یابد و سبد خرید ذخیره‌شده باقی می‌ماند."
        icon={LogOut}
        title="خروج از حساب"
      />
    </>
  );
};

const DeleteAccountCard = () => {
  const [isPending, startTransition] = useTransition();
  const [showDelete, setShowDelete] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const deleteAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = String(
      new FormData(event.currentTarget).get("deletePassword") ?? "",
    );

    if (confirmation !== "حذف حساب") {
      toast.error("عبارت تأیید را دقیق وارد کنید");
      return;
    }

    startTransition(async () => {
      const { error } = await authClient.deleteUser({ password });

      if (error) {
        toast.error(getErrorMessage(error));
        return;
      }

      window.location.assign("/");
    });
  };

  return (
    <div className="rounded-4xl border border-red-200 bg-red-50/70 p-5 sm:p-7">
      <div className="flex items-start gap-4">
        <div className="center size-12 shrink-0 rounded-2xl bg-red-100 text-error">
          <Trash2 className="size-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-black text-gray-900">حذف همیشگی حساب</h3>
          <p className="mt-1 text-xs leading-6 text-gray-600">
            اطلاعات حساب، نشانی‌ها و سابقه سفارش‌ها برای همیشه حذف می‌شود و قابل
            بازگشت نیست.
          </p>
          {!showDelete ? (
            <button
              className="mt-4 text-sm font-bold text-error underline decoration-red-200 underline-offset-4"
              onClick={() => setShowDelete(true)}
              type="button"
            >
              می‌خواهم حسابم را حذف کنم
            </button>
          ) : (
            <form className="mt-5 space-y-4" onSubmit={deleteAccount}>
              <label
                htmlFor="confirm"
                className="block text-sm font-bold text-gray-700"
              >
                برای تأیید، عبارت «حذف حساب» را بنویسید
                <TextField
                  id="confirm"
                  onChange={(event) => setConfirmation(event.target.value)}
                  value={confirmation}
                />
              </label>
              <PasswordFieldWithLabel label="رمز فعلی" name="deletePassword" />
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-full bg-error px-6 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isPending || confirmation !== "حذف حساب"}
                  type="submit"
                >
                  حذف همیشگی حساب
                </button>
                <button
                  className="rounded-full border border-red-200 px-6 py-2.5 text-sm font-bold text-gray-700"
                  onClick={() => {
                    setShowDelete(false);
                    setConfirmation("");
                  }}
                  type="button"
                >
                  منصرف شدم
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const SecuritySettings = () => (
  <section aria-labelledby="security-heading">
    <div className="mb-6">
      <h2 className="text-2xl font-black text-gray-900" id="security-heading">
        امنیت و ورود
      </h2>
      <p className="mt-1 text-sm leading-6 text-primary-900">
        رمز قوی و کنترل نشست‌ها، حساب شما را امن نگه می‌دارد.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-5 max-xl:grid-cols-1">
      <div>
        <ChangePassword />
      </div>
      <div className="flex flex-col gap-5">
        <SessionCards />
        <DeleteAccountCard />
        <div className="flex items-center gap-2 rounded-2xl bg-secondary-500/5 px-4 py-3 text-xs leading-6 text-secondary-800">
          <ShieldCheck className="size-4 shrink-0" />
          هیچ‌وقت رمز عبور یا کد یک‌بارمصرف خود را در اختیار دیگران قرار ندهید.
        </div>
      </div>
    </div>
  </section>
);
