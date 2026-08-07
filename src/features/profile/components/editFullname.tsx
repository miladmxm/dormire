import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Controller } from "react-hook-form";

import FormInputError from "@/components/ui/formInputError";
import Spiner from "@/components/ui/spiner";

import { useUpdateFullname } from "../hooks/useUpdateProfile";

const inputClassName =
  "w-full rounded-2xl border border-primary-300 bg-primary-25 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-primary-600/60 focus:border-secondary-500 focus:bg-white focus:ring-4 focus:ring-secondary-500/10 disabled:cursor-not-allowed disabled:opacity-70";

const EditFullname = (props: { name: string }) => {
  const { control, onSubmit, isPending } = useUpdateFullname(props);
  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="fullname"
        render={({ field, fieldState }) => (
          <label className="block text-sm font-bold text-gray-700 sm:col-span-2">
            نام و نام خانوادگی
            <div className="relative">
              <input
                autoComplete="name"
                className={inputClassName}
                maxLength={80}
                {...field}
              />
              <motion.button
                initial={{ scale: 0, opacity: 0, rotate: 30 }}
                animate={
                  fieldState.isDirty ? { scale: 1, opacity: 1, rotate: 0 } : {}
                }
                disabled={!fieldState.isDirty}
                type="submit"
                className="inset-e-2 absolute size-6 top-3"
              >
                {isPending ? <Spiner /> : <Check className="size-full" />}
              </motion.button>
            </div>
            <FormInputError error={fieldState.error} />
          </label>
        )}
      />
    </form>
  );
};

export default EditFullname;
