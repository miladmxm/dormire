import type { FieldError } from "react-hook-form";

import { Controller, useFormContext } from "react-hook-form";

import FormInputError from "@/components/ui/formInputError";

import type { NewProfileAddressInput } from "../validations/address";

const useAddressFormContext = useFormContext<NewProfileAddressInput>;

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-primary-300 bg-primary-25 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-primary-600/60 focus:border-secondary-500 focus:bg-white focus:ring-4 focus:ring-secondary-500/10";

const AddressField = ({
  error,
  label,
  ...props
}: React.ComponentProps<"input"> & { label: string; error?: FieldError }) => (
  <label className="block text-sm font-bold text-gray-700">
    {label}
    <input {...props} className={fieldClassName} />
    <FormInputError error={error} />
  </label>
);

export const AddressNameField = () => {
  const { control } = useAddressFormContext();
  return (
    <Controller
      control={control}
      name="fullname"
      render={({ field, fieldState }) => (
        <AddressField
          autoComplete="name"
          label="نام تحویل‌گیرنده"
          placeholder="مثلاً سارا محمدی"
          error={fieldState.error}
          {...field}
        />
      )}
    />
  );
};

export const AddressPhoneNumberField = () => {
  const { control } = useAddressFormContext();
  return (
    <Controller
      control={control}
      name="phoneNumber"
      render={({ field, fieldState }) => (
        <AddressField
          autoComplete="tel"
          label="شماره تلفن"
          dir="ltr"
          inputMode="tel"
          placeholder="مثلاً ۰۹۱۲۳۴۵۶۷89"
          error={fieldState.error}
          {...field}
        />
      )}
    />
  );
};

export const AddressPostCodeField = () => {
  const { control } = useAddressFormContext();
  return (
    <Controller
      control={control}
      name="postCode"
      render={({ field, fieldState }) => (
        <AddressField
          autoComplete="postal-code"
          label="کد پستی"
          dir="ltr"
          inputMode="numeric"
          placeholder="مثلاً 1234554321"
          error={fieldState.error}
          maxLength={10}
          {...field}
        />
      )}
    />
  );
};

export const AddressProvinceField = () => {
  const { control } = useAddressFormContext();
  return (
    <Controller
      control={control}
      name="province"
      render={({ field, fieldState }) => (
        <AddressField
          autoComplete="off"
          label="استان"
          placeholder="مثلاً تهران"
          error={fieldState.error}
          {...field}
        />
      )}
    />
  );
};

export const AddressCityField = () => {
  const { control } = useAddressFormContext();
  return (
    <Controller
      control={control}
      name="city"
      render={({ field, fieldState }) => (
        <AddressField
          autoComplete="off"
          label="شهر"
          placeholder="مثلاً تهران"
          error={fieldState.error}
          {...field}
        />
      )}
    />
  );
};

export const AddressAdditionalField = () => {
  const { control } = useAddressFormContext();
  return (
    <Controller
      control={control}
      name="additionalAddress"
      render={({ field, fieldState }) => (
        <label className="block text-sm font-bold text-gray-700">
          نشانی کامل
          <textarea
            className={`${fieldClassName} min-h-28 resize-none leading-7`}
            placeholder="خیابان، کوچه، پلاک و واحد"
            {...field}
          />
          <FormInputError error={fieldState.error} />
        </label>
      )}
    />
  );
};
