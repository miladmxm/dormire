"use client";

import {
  Eye,
  EyeOff,
  KeyRound,
  LogOut,
  MonitorSmartphone,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

const inputClassName =
  "mt-2 w-full rounded-2xl border border-primary-300 bg-primary-25 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-primary-600/60 focus:border-secondary-500 focus:bg-white focus:ring-4 focus:ring-secondary-500/10 disabled:cursor-not-allowed disabled:opacity-70";

const getErrorMessage = (error: { message?: string } | null) =>
  error?.message || "در انجام عملیات مشکلی پیش آمد؛ دوباره تلاش کنید.";

const PasswordInput = ({ label, name }: { label: string; name: string }) => {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block text-sm font-bold text-gray-700">
      {label}
      <div className="relative">
        <input
          autoComplete={
            name === "currentPassword" ? "current-password" : "new-password"
          }
          className={`${inputClassName} pl-12`}
          minLength={12}
          name={name}
          required
          type={visible ? "text" : "password"}
        />
        <button
          aria-label={visible ? "پنهان کردن رمز" : "نمایش رمز"}
          className="center absolute left-2 top-1/2 mt-1 size-9 -translate-y-1/2 rounded-full text-primary-900 transition hover:bg-primary-200"
          onClick={() => setVisible((current) => !current)}
          type="button"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </label>
  );
};

const PasswordCard = () => {
  const [isPending, startTransition] = useTransition();

  const changePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const currentPassword = String(formData.get("currentPassword") ?? "");
    const newPassword = String(formData.get("newPassword") ?? "");
    const confirmation = String(formData.get("confirmation") ?? "");

    if (newPassword.length < 12) {
      toast.error("رمز جدید باید حداقل ۱۲ کاراکتر باشد");
      return;
    }

    if (newPassword !== confirmation) {
      toast.error("تکرار رمز با رمز جدید یکسان نیست");
      return;
    }

    startTransition(async () => {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(getErrorMessage(error));
        return;
      }

      form.reset();
      toast.success("رمز عبور تغییر کرد و نشست‌های دیگر بسته شدند");
    });
  };

  return (
    <form
      className="rounded-4xl border border-primary-300 bg-white p-5 sm:p-7"
      onSubmit={changePassword}
    >
      <div className="mb-6 flex items-center gap-4 border-b border-primary-200 pb-6">
        <div className="center size-12 rounded-2xl bg-secondary-500/10 text-secondary-600">
          <KeyRound className="size-5" />
        </div>
        <div>
          <h3 className="font-black text-gray-900">تغییر رمز عبور</h3>
          <p className="mt-1 text-xs leading-5 text-primary-900">
            حداقل ۱۲ کاراکتر؛ ترجیحاً ترکیبی از حروف، عدد و نشانه‌ها.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <PasswordInput label="رمز فعلی" name="currentPassword" />
        </div>
        <PasswordInput label="رمز جدید" name="newPassword" />
        <PasswordInput label="تکرار رمز جدید" name="confirmation" />
      </div>
      <div className="mt-6 flex justify-end">
        <button
          className="rounded-full bg-secondary-500 px-7 py-3 text-sm font-bold text-white transition hover:bg-secondary-600 disabled:cursor-wait disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "در حال تغییر..." : "تغییر رمز"}
        </button>
      </div>
    </form>
  );
};

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
              <label className="block text-sm font-bold text-gray-700">
                برای تأیید، عبارت «حذف حساب» را بنویسید
                <input
                  className={inputClassName}
                  onChange={(event) => setConfirmation(event.target.value)}
                  value={confirmation}
                />
              </label>
              <PasswordInput label="رمز فعلی" name="deletePassword" />
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
  <section aria-labelledby="security-heading" className="max-w-3xl space-y-5">
    <div className="mb-6">
      <h2 className="text-2xl font-black text-gray-900" id="security-heading">
        امنیت و ورود
      </h2>
      <p className="mt-1 text-sm leading-6 text-primary-900">
        رمز قوی و کنترل نشست‌ها، حساب شما را امن نگه می‌دارد.
      </p>
    </div>
    <PasswordCard />
    <SessionCards />
    <DeleteAccountCard />
    <div className="flex items-center gap-2 rounded-2xl bg-secondary-500/5 px-4 py-3 text-xs leading-6 text-secondary-800">
      <ShieldCheck className="size-4 shrink-0" />
      هیچ‌وقت رمز عبور یا کد یک‌بارمصرف خود را در اختیار دیگران قرار ندهید.
    </div>
  </section>
);
