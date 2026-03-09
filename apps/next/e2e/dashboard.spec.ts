import { test, expect } from "./fixtures";

test.describe("Dashboard page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("renders user greeting", async ({ page }) => {
    await expect(page.getByText(/Hey,/i)).toBeVisible();
  });

  test("renders XP progress bar", async ({ page }) => {
    await expect(page.getByText(/XP/i).first()).toBeVisible();
  });

  test("renders streak badge", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Streak & Activity/i })
    ).toBeVisible();
  });

  test("renders Tricks Mastered stat", async ({ page }) => {
    await expect(page.getByText(/Tricks Mastered/i).first()).toBeVisible();
  });

  test("renders Total XP stat", async ({ page }) => {
    await expect(page.getByText(/Total XP/i)).toBeVisible();
  });

  test("renders Best Streak stat", async ({ page }) => {
    await expect(page.getByText(/Best Streak/i).first()).toBeVisible();
  });

  test("renders Active Paths stat", async ({ page }) => {
    await expect(page.getByText(/Active Paths/i)).toBeVisible();
  });

  test("renders Browse Tricks quick action link", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /Browse Tricks/i })
    ).toBeVisible();
  });

  test("renders Learning Paths quick action link", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /Learning Paths/i })
    ).toBeVisible();
  });

  test("Browse Tricks links to /library", async ({ page }) => {
    const link = page.getByRole("link", { name: /Browse Tricks/i });
    await expect(link).toHaveAttribute("href", "/library");
  });

  test("Learning Paths links to /paths", async ({ page }) => {
    const link = page.getByRole("link", { name: /Learning Paths/i });
    await expect(link).toHaveAttribute("href", "/paths");
  });
});
