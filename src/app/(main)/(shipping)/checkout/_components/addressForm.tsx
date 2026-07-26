"use client";

import type { ComponentProps, PropsWithChildren, RefObject } from "react";

import { Controller } from "react-hook-form";

import { useAddAddress } from "@/features/shipping/hooks/useAddAddress";

import { useSetShippingState } from "../../_store";

const NormalTextInput = ({
  label,
  ...props
}: ComponentProps<"input"> & { label: string }) => {
  return (
    <div className="flex items-center gap-2">
      <label
        className="text-lg font-bold w-1/3 text-nowrap min-w-max"
        htmlFor={props.id}
      >
        {label}:
      </label>
      <input
        className="flex-auto py-1.5 px-2.5 rounded-full min-w-0 bg-white border border-primary-500"
        type="text"
        {...props}
      />
    </div>
  );
};

const NormalTextarea = ({
  label,
  ...props
}: ComponentProps<"textarea"> & { label: string }) => {
  return (
    <div className="flex gap-2">
      <label
        className="text-lg font-bold w-1/3 text-wrap min-w-max"
        htmlFor={props.id}
      >
        {label}:
      </label>
      <textarea
        rows={5}
        className="flex-auto py-2 px-3 rounded-3xl bg-white border border-primary-500 resize-none"
        {...props}
      />
    </div>
  );
};

const ErrorMessage = ({ message }: { message?: string }) => {
  return (
    <small className="ps-2 block pt-2 text-sm text-error">{message}</small>
  );
};

const FieldGroup = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-2 gap-4 auto-rows-auto @max-2xl:grid-cols-1">
      {children}
    </div>
  );
};

export interface AddressFormProps {
  submitButtonRef: RefObject<HTMLButtonElement | null>;
}

const AddressForm = ({ submitButtonRef }: AddressFormProps) => {
  const setShippingState = useSetShippingState();
  const { control, onSubmit } = useAddAddress((id: string) => {
    setShippingState({
      addressId: id,
      step: 3,
    });
  });
  return (
    <section className="border border-primary-500 bg-primary-25 py-4 px-8 rounded-4xl @container">
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Controller
            control={control}
            name="fullname"
            render={({ field, fieldState }) => (
              <div>
                <NormalTextInput
                  {...field}
                  id={field.name}
                  label="نام و نام خانوادگی"
                  placeholder="علیرضا حسینی"
                />
                {fieldState.invalid && (
                  <ErrorMessage message={fieldState.error?.message} />
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <div>
                <NormalTextInput
                  {...field}
                  id={field.name}
                  dir="ltr"
                  label="شماره تماس"
                  placeholder="09129876543"
                />
                {fieldState.invalid && (
                  <ErrorMessage message={fieldState.error?.message} />
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="province"
            render={({ field, fieldState }) => (
              <div>
                <NormalTextInput
                  {...field}
                  id={field.name}
                  label="استان"
                  placeholder="تهران"
                />
                {fieldState.invalid && (
                  <ErrorMessage message={fieldState.error?.message} />
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="city"
            render={({ field, fieldState }) => (
              <div>
                <NormalTextInput
                  {...field}
                  id={field.name}
                  label="شهر"
                  placeholder="تهران"
                />
                {fieldState.invalid && (
                  <ErrorMessage message={fieldState.error?.message} />
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="additionalAddress"
            render={({ field, fieldState }) => (
              <div className="">
                <NormalTextarea
                  {...field}
                  id={field.name}
                  label="آدرس"
                  placeholder="خیابان سعیدی-خیابان شکری-کوچه ۹-پلاک ۱۲"
                />
                {fieldState.invalid && (
                  <ErrorMessage message={fieldState.error?.message} />
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="postCode"
            render={({ field, fieldState }) => (
              <div>
                <NormalTextInput
                  {...field}
                  id={field.name}
                  label="کد پستی"
                  dir="ltr"
                  placeholder="1897675421"
                />
                {fieldState.invalid && (
                  <ErrorMessage message={fieldState.error?.message} />
                )}
              </div>
            )}
          />
        </FieldGroup>
        <button type="submit" ref={submitButtonRef} className="sr-only" />
      </form>
    </section>
  );
};

export default AddressForm;
