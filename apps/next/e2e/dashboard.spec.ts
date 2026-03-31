import { test, expect } from "./fixtures";

test.describe("Dashboard page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("renders user greeting", async ({ page }) => {
    await expect(page.getByText(/Welcome back/i)).toBeVisible();
  });

  test("renders display name", async ({ page }) => {
    await expect(page.getByText(/Champion/i).first()).toBeVisible();
  });

  test("renders level badge with crown", async ({ page }) => {
    await expect(page.getByText("👑")).toBeVisible();
  });

  test("renders Getting Started section", async ({ page }) => {
    await expect(page.getByText(/Getting Started/i)).toBeVisible();
  });

  test("renders Browse Tricks section", async ({ page }) => {
    await expect(page.getByText(/Browse Tricks/i).first()).toBeVisible();
  });

  test("renders trick search input", async ({ page }) => {
    await expect(
      page.getByPlaceholder(/Search tricks/i)
    ).toBeVisible();
  });

  test("renders category cells", async ({ page }) => {
    await expect(page.getByText(/Foundations/i)).toBeVisible();
    await expect(page.getByText(/String Tricks/i).first()).toBeVisible();
  });

  test("renders trick cards", async ({ page }) => {
    await expect(page.getByText(/Sleeper/i).first()).toBeVisible();
  });

  test("renders View All button", async ({ page }) => {
    await expect(page.getByText(/View All/i)).toBeVisible();
  });

  test("renders Advanced Tricks section", async ({ page }) => {
    await expect(page.getByText(/Advanced Tricks/i).first()).toBeVisible();
  });

  test("renders News section", async ({ page }) => {
    await expect(page.getByText(/News & Updates/i)).toBeVisible();
  });
});
