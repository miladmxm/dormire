import * as v from "valibot";

const EnvSchema = v.object({
  NODE_ENV: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your APP_MODE."),
    v.union(
      [v.literal("development"), v.literal("production")],
      "APP_MODE must be either 'development' or 'production'.",
    ),
  ),
  ORIGIN: v.pipe(v.string(), v.nonEmpty(), v.url()),
  DB_URL: v.pipe(v.string(), v.nonEmpty()),
  // BETTER_AUTH_SECRET: v.pipe(v.string(), v.minLength(10), v.nonEmpty()),
  PORT: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.transform((value) => parseInt(value, 10)),
    v.number(),
    v.integer(),
    v.minValue(3000),
  ),

  ADMIN_USERNAME: v.pipe(v.string(), v.nonEmpty(), v.minLength(3)),
  ADMIN_EMAIL: v.pipe(v.string(), v.email(), v.nonEmpty()),
  ADMIN_PASSWORD: v.pipe(v.string(), v.nonEmpty(), v.minLength(8)),
  ADMIN_NAME: v.pipe(v.optional(v.string())),

  DB_NAME: v.pipe(v.string(), v.nonEmpty()),

  S3_USER: v.pipe(v.string(), v.nonEmpty()),
  S3_PASSWORD: v.pipe(v.string(), v.nonEmpty()),
  S3_ENDPOINT: v.pipe(v.string(), v.nonEmpty(), v.url()),
  S3_REGION: v.pipe(v.string(), v.nonEmpty()),
  S3_BUCKET: v.pipe(v.string(), v.nonEmpty()),
  S3_PORT: v.pipe(v.string(), v.nonEmpty()),

  ZARINPAL_GATEWAY_ID: v.pipe(v.string(), v.nonEmpty()),
  SAMAN_GATEWAY_ID: v.pipe(v.string(), v.nonEmpty()),
});
type Env = v.InferOutput<typeof EnvSchema>;

const ENV = (): Env => {
  try {
    const env = v.parse(EnvSchema, process.env);
    return env;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const isProduction = () => {
  const env = ENV();
  return env.NODE_ENV === "production";
};

export default ENV();
