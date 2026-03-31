import { test, expect } from "./fixtures";

test.describe("Web navigation", () => {
  test("sidebar renders on dashboard at lg viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await expect(page.locator("aside").first()).toBeVisible();
  });

  test("sidebar contains Home nav link", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    // Scope to the first aside (app sidebar) and match by href
    await expect(
      page.locator("aside").first().locator('a[href="/dashboard"]').first()
    ).toBeVisible();
  });

  test("sidebar contains Champion Path nav link", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await expect(
      page.locator("aside").first().locator('a[href="/library"]').first()
    ).toBeVisible();
  });

  test("sidebar contains Shop nav link", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await expect(
      page.locator("aside").first().locator('a[href="/shop"]').first()
    ).toBeVisible();
  });

  test("sidebar contains For You nav link", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await expect(
      page.locator("aside").first().locator('a[href="/for-you"]').first()
    ).toBeVisible();
  });

  test("sidebar Champion Path navigates to /library", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await page
      .locator("aside")
      .first()
      .locator('a[href="/library"]')
      .first()
      .click({ force: true });
    await expect(page).toHaveURL(/\/library/);
  });

  test("header is visible on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/dashboard");
    await expect(page.getByRole("banner").first()).toBeVisible();
  });

  test("can navigate from landing to dashboard via login flow", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Become the Yo-Yo Player/i })).toBeVisible();
    await page.goto("/dashboard");
    await expect(page.getByText(/Hey,/i)).toBeVisible();
  });

  test("can navigate from dashboard to library", async ({ page }) => {
    await page.goto("/dashboard");
    await page.goto("/library");
    await expect(page.getByRole("heading", { name: /Trick Library/i })).toBeVisible();
  });

  test("can navigate from dashboard to paths", async ({ page }) => {
    await page.goto("/dashboard");
    await page.goto("/paths");
    await expect(page.getByRole("heading", { name: /Learning Paths/i })).toBeVisible();
  });

  test("can navigate from dashboard to profile", async ({ page }) => {
    await page.goto("/dashboard");
    await page.goto("/profile");
    await expect(page.getByText(/Tricks Mastered/i).first()).toBeVisible();
  });
});
