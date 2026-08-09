import { instant } from "@next/playwright";
import { expect, test } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "http://localhost:3000";
const authOrigin = process.env.BETTER_AUTH_URL ?? new URL(baseURL).origin;
const shellMarker = "[data-testid='orders-shell-marker']";
const dynamicContent = "[data-testid='orders-dynamic-content']";

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

test("پوسته سفارش‌ها در بارگذاری مستقیم فوری نمایش داده می‌شود", async ({
  page,
}) => {
  const ordersURL = new URL("/admin/orders", baseURL).toString();

  await instant(
    page,
    async () => {
      await page.goto(ordersURL);

      await expect(page.locator(shellMarker)).toBeVisible();
      await expect(page.locator(dynamicContent)).toHaveCount(0);
    },
    { baseURL: new URL(ordersURL).origin },
  );
});

test("پوسته سفارش‌ها در ناوبری داخلی فوری نمایش داده می‌شود", async ({
  page,
}) => {
  await page.goto(new URL("/admin", baseURL).toString());
  const ordersLink = page.getByTestId("orders-nav-link");

  await expect(ordersLink).toBeVisible();

  await instant(page, async () => {
    await ordersLink.click();

    await expect(page.locator(shellMarker)).toBeVisible();
    await expect(page.locator(dynamicContent)).toHaveCount(0);
  });

  await expect(page.locator(dynamicContent)).toBeVisible();
});
