import { instant } from "@next/playwright";
import { expect, test } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "http://localhost:3000";
const authOrigin = process.env.BETTER_AUTH_URL ?? new URL(baseURL).origin;
const shellMarker = "[data-testid='profile-shell-marker']";
const dynamicContent = "[data-testid='profile-dynamic-content']";

test.beforeEach(async ({ page }) => {
  const response = await page.request.post("/api/auth/sign-in/email", {
    data: {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    },
    headers: { origin: authOrigin },
  });

  expect(response.ok()).toBeTruthy();
});

test("پوسته پروفایل در بارگذاری مستقیم فوری نمایش داده می‌شود", async ({
  page,
}) => {
  const profileURL = new URL("/profile", baseURL).toString();

  await instant(
    page,
    async () => {
      await page.goto(profileURL);

      await expect(page.locator(shellMarker)).toBeVisible();
    },
    { baseURL: new URL(profileURL).origin },
  );
});

test("پوسته پروفایل در ناوبری داخلی فوری نمایش داده می‌شود", async ({
  page,
}) => {
  await page.goto("/");
  const profileLink = page.getByTestId("profile-link");

  await expect(profileLink).toBeVisible();

  await instant(page, async () => {
    await profileLink.click();

    await expect(page.locator(shellMarker)).toBeVisible();
    await expect(page.locator(dynamicContent)).toHaveCount(0);
  });

  await expect(page.locator(dynamicContent)).toBeVisible();
});
