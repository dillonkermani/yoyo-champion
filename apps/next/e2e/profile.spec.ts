import { test, expect } from "./fixtures";

test.describe("Profile page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/profile");
  });

  test("renders avatar with initials", async ({ page }) => {
    await expect(page.getByText("C").first()).toBeVisible();
  });

  test("renders display name", async ({ page }) => {
    await expect(page.getByText(/Champion/i).first()).toBeVisible();
  });

  test("renders level indicator", async ({ page }) => {
    await expect(page.getByText(/LV\.1/i)).toBeVisible();
  });

  test("renders Total XP stat", async ({ page }) => {
    await expect(page.getByText(/Total XP/i)).toBeVisible();
  });

  test("renders Streak stat", async ({ page }) => {
    await expect(page.getByText(/Streak/i).first()).toBeVisible();
  });

  test("renders My Yo-Yos section", async ({ page }) => {
    await expect(page.getByText(/My Yo-Yos/i)).toBeVisible();
  });

  test("renders yo-yo items", async ({ page }) => {
    await expect(page.getByText(/Arrow Yoyo/i)).toBeVisible();
    await expect(page.getByText(/Shutter Yoyo/i).first()).toBeVisible();
  });

  test("renders Log Out button", async ({ page }) => {
    await expect(page.getByRole("button", { name: /Log Out/i })).toBeVisible();
  });
});
