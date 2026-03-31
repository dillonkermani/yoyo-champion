import { test, expect } from "./fixtures";

test.describe("Web navigation", () => {
  test("bottom tab bar renders on dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText("Home").last()).toBeVisible();
    await expect(page.getByText("Learn").last()).toBeVisible();
    await expect(page.getByText("Shop").last()).toBeVisible();
    await expect(page.getByText("Profile").last()).toBeVisible();
  });

  test("tab bar contains Home tab with emoji", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText("🏠").last()).toBeVisible();
  });

  test("tab bar contains Learn tab with emoji", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText("📖").last()).toBeVisible();
  });

  test("tab bar contains Shop tab with emoji", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText("🛍️").last()).toBeVisible();
  });

  test("tab bar contains For You tab with emoji", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText("▶️").last()).toBeVisible();
  });

  test("root URL loads dashboard content", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Welcome back/i)).toBeVisible();
  });

  test("can navigate to library", async ({ page }) => {
    await page.goto("/library");
    await expect(page.getByText(/Trick Library/i).first()).toBeVisible();
  });

  test("can navigate to profile", async ({ page }) => {
    await page.goto("/profile");
    await expect(page.getByText(/Total XP/i)).toBeVisible();
  });

  test("can navigate to onboarding", async ({ page }) => {
    await page.goto("/onboarding");
    await expect(page.getByText(/Learn Yoyo/i)).toBeVisible();
  });
});
