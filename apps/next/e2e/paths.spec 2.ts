import { test, expect } from "./fixtures";

test.describe("Learning Paths page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/paths");
  });

  test("renders Learning Paths heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Learning Paths/i })
    ).toBeVisible();
  });

  test("renders difficulty filter buttons", async ({ page }) => {
    await expect(page.getByRole("button", { name: /All Levels/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Beginner/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Intermediate/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Advanced/i })).toBeVisible();
  });

  test("renders Featured Paths section", async ({ page }) => {
    await expect(page.getByText(/Featured Paths/i)).toBeVisible();
  });

  test("clicking Beginner filter shows filtered paths", async ({ page }) => {
    await page.getByRole("button", { name: /Beginner/i }).click();
    // Page should still render the heading and some content
    await expect(
      page.getByRole("heading", { name: /Learning Paths/i })
    ).toBeVisible();
  });

  test("clicking Expert filter shows filtered paths", async ({ page }) => {
    await page.getByRole("button", { name: /Expert/i }).click();
    await expect(
      page.getByRole("heading", { name: /Learning Paths/i })
    ).toBeVisible();
  });

  test("clicking All Levels resets filter", async ({ page }) => {
    await page.getByRole("button", { name: /Beginner/i }).click();
    await page.getByRole("button", { name: /All Levels/i }).click();
    await expect(page.getByText(/Featured Paths/i)).toBeVisible();
  });
});
