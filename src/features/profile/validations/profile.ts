import * as v from "valibot";

export const UpdateFullnameSchema = v.object({
  fullname: v.pipe(v.string(), v.nonEmpty("نمیتواند خالی باشدس")),
});
