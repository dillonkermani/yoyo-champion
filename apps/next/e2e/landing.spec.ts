import { test, expect } from "@playwright/test";

test.describe("Onboarding welcome page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/onboarding");
  });

  test("renders onboarding welcome heading", async ({ page }) => {
    await expect(page.getByText(/Learn Yoyo the Right Way/i)).toBeVisible();
  });

  test("renders Start button", async ({ page }) => {
    await expect(page.getByText(/Start/i).last()).toBeVisible();
  });

  test("renders feature pills", async ({ page }) => {
    await expect(page.getByText(/Video Tutorials/i)).toBeVisible();
    await expect(page.getByText(/Achievements/i)).toBeVisible();
    await expect(page.getByText(/Daily Streaks/i)).toBeVisible();
  });

  test("renders mascot emoji", async ({ page }) => {
    await expect(page.getByText("🪀").first()).toBeVisible();
  });

  test("renders subtitle", async ({ page }) => {
    await expect(page.getByText(/Built by a 2x World Champion/i)).toBeVisible();
  });
});
