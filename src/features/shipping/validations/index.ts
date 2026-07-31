import * as v from "valibot";

import { GATEWAYS } from "@/constant/appData";

export const AddAddressSchema = v.object({
  fullname: v.pipe(
    v.string(),
    v.nonEmpty("نام و نام خانوادگی تحویل گیرنده اجباری است"),
  ),
  phoneNumber: v.pipe(v.string(), v.nonEmpty("شماره تلفن اجباری است")),
  postCode: v.pipe(v.string(), v.nonEmpty("کد پستی را وارد کنید")),
  province: v.pipe(v.string(), v.nonEmpty("استان محل دریافت را وارد کنید")),
  city: v.pipe(v.string(), v.nonEmpty("شهر محل دریافت را وارد کنید")),
  additionalAddress: v.pipe(v.string(), v.nonEmpty("آدرس تکمیلی را بنویسید")),
});

export type AddAddressOutput = v.InferOutput<typeof AddAddressSchema>;

export const CreateOrderSchema = v.object({
  addressId: v.pipe(v.string(), v.nonEmpty("آدرس تحویل گیرنده اجباری است")),
  sendingMethod: v.pipe(v.string(), v.nonEmpty("روش ارسال اجباری است")),
  paymentGateway: v.pipe(v.string(), v.nonEmpty("درگاه پرداخت اجباری است")),
});

export type CreateOrderOutput = v.InferOutput<typeof CreateOrderSchema>;

export const VerifyCallbackParams = v.object({
  orderId: v.pipe(v.string(), v.nonEmpty()),
  gateway: v.pipe(v.string(), v.picklist(GATEWAYS)),
});
