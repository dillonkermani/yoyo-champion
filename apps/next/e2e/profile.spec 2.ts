import { test, expect } from "./fixtures";

test.describe("Profile page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/profile");
  });

  test("renders profile header", async ({ page }) => {
    await expect(page.locator("header, [class*='profile'], [class*='banner']").first()).toBeVisible();
  });

  test("renders Tricks Mastered stat", async ({ page }) => {
    await expect(page.getByText(/Tricks Mastered/i).first()).toBeVisible();
  });

  test("renders Total XP stat", async ({ page }) => {
    await expect(page.getByText(/Total XP/i).first()).toBeVisible();
  });

  test("renders Paths Completed stat", async ({ page }) => {
    await expect(page.getByText(/Paths Completed/i)).toBeVisible();
  });

  test("renders Featured Badges section", async ({ page }) => {
    await expect(page.getByText(/Featured Badges/i)).toBeVisible();
  });

  test("renders Recent Activity section", async ({ page }) => {
    await expect(page.getByText(/Recent Activity/i)).toBeVisible();
  });

  test("renders Mastered Trapeze activity", async ({ page }) => {
    await expect(page.getByText(/Mastered Trapeze/i)).toBeVisible();
  });

  test("renders Settings link in main content", async ({ page }) => {
    await expect(
      page.getByRole("main").getByRole("link", { name: /Settings/i })
    ).toBeVisible();
  });

  test("Settings link navigates to /profile/settings", async ({ page }) => {
    await page.getByRole("main").getByRole("link", { name: /Settings/i }).click();
    await expect(page).toHaveURL(/\/profile\/settings/);
  });
});
