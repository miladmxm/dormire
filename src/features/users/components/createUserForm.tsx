"use client";

import { FormProvider } from "react-hook-form";

import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { FieldGroup } from "@/components/dashboard/ui/field";
import { Spinner } from "@/components/dashboard/ui/spinner";

import { useCreateUser } from "../hooks/useCreateUser";
import {
  EmailField,
  NameField,
  PasswordField,
  PhoneNumberField,
  RoleSelector,
  VerifyField,
} from "./createUserFields";

const CreateUserForm = () => {
  const { form, onSubmit, isPending } = useCreateUser();
  return (
    <Card className="max-w-5xl mx-auto w-full">
      <CardHeader>
        <CardTitle>افزودن کاربر جدید</CardTitle>
      </CardHeader>
      <FormProvider {...form}>
        <form autoComplete="off" onSubmit={onSubmit}>
          <CardContent>
            <FieldGroup>
              <div className="flex gap-4 max-md:flex-col">
                <NameField />
                <EmailField />
              </div>
              <div className="flex gap-4 max-md:flex-col">
                <PasswordField />
                <RoleSelector />
              </div>
              <div className="flex gap-4 max-md:flex-col">
                <PhoneNumberField />
                <VerifyField />
              </div>
              <Button type="submit" disabled={isPending}>
                ایجاد
                {isPending && <Spinner />}
              </Button>
            </FieldGroup>
          </CardContent>
        </form>
      </FormProvider>
    </Card>
  );
};

export default CreateUserForm;
