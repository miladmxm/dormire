import type { Variants } from "motion/react";

import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Controller } from "react-hook-form";

import TextField from "@/components/ui/auth/text";
import FormInputError from "@/components/ui/formInputError";

import { useDeleteAccount } from "../hooks/useDeleteAccount";
import PasswordFieldWithLabel from "./passwordField";

const DeleteAccountForm = ({
  onCancel,
  isShow,
}: {
  onCancel: () => void;
  isShow: boolean;
}) => {
  const { control, isPending, onSubmit, reset } = useDeleteAccount();

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const motionVariants: Variants = {
    hide: { height: 0, opacity: 0 },
    show: { height: "auto", opacity: 1 },
  };
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial="hide"
          animate="show"
          variants={motionVariants}
          exit="hide"
          className="overflow-hidden"
        >
          <form className="mt-5 space-y-4" onSubmit={onSubmit}>
            <Controller
              control={control}
              name="confirm"
              render={({ field, fieldState }) => (
                <label
                  htmlFor={field.name}
                  className="flex flex-col gap-2 text-sm font-bold text-gray-700"
                >
                  برای تأیید، عبارت «حذف حساب» را بنویسید
                  <TextField id={field.name} {...field} />
                  <FormInputError error={fieldState.error} />
                </label>
              )}
            />
            <Controller
              control={control}
              name="deletePassword"
              render={({ field, fieldState }) => (
                <PasswordFieldWithLabel label="رمز فعلی" {...field}>
                  <FormInputError error={fieldState.error} />
                </PasswordFieldWithLabel>
              )}
            />
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-full bg-error px-6 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isPending}
                type="submit"
              >
                حذف همیشگی حساب
              </button>
              <button
                className="rounded-full border border-red-200 px-6 py-2.5 text-sm font-bold text-gray-700"
                onClick={handleCancel}
                type="button"
              >
                منصرف شدم
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DeleteAccount = () => {
  const [showDelete, setShowDelete] = useState<boolean>(false);

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
          {!showDelete && (
            <button
              className="mt-4 text-sm font-bold text-error underline decoration-red-200 underline-offset-4"
              onClick={() => setShowDelete(true)}
              type="button"
            >
              می‌خواهم حسابم را حذف کنم
            </button>
          )}
        </div>
      </div>
      <DeleteAccountForm
        isShow={showDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
};

export default DeleteAccount;
