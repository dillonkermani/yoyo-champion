import { test, expect } from "./fixtures";

test.describe("Learning Paths (via library)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/library");
  });

  test("renders Trick Library heading", async ({ page }) => {
    await expect(page.getByText(/Trick Library/i).first()).toBeVisible();
  });

  test("renders difficulty filter chips", async ({ page }) => {
    await expect(page.getByText(/^All$/i).first()).toBeVisible();
    await expect(page.getByText(/^Beginner$/i).first()).toBeVisible();
    await expect(page.getByText(/^Easy$/i).first()).toBeVisible();
    await expect(page.getByText(/^Intermediate$/i).first()).toBeVisible();
    await expect(page.getByText(/^Advanced$/i).first()).toBeVisible();
    await expect(page.getByText(/^Master$/i).first()).toBeVisible();
  });

  test("renders trick count", async ({ page }) => {
    await expect(page.getByText(/\d+ tricks/i).first()).toBeVisible();
  });

  test("renders trick cards with names", async ({ page }) => {
    await expect(page.getByText(/Sleeper/i).first()).toBeVisible();
    await expect(page.getByText(/Trapeze/i).first()).toBeVisible();
  });

  test("renders XP rewards on trick cards", async ({ page }) => {
    await expect(page.getByText(/\+\d+ XP/i).first()).toBeVisible();
  });
});
