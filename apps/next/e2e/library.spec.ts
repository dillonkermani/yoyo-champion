import { test, expect } from "./fixtures";

test.describe("Trick Library page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/library");
  });

  test("renders Trick Library heading", async ({ page }) => {
    await expect(page.getByText(/Trick Library/i).first()).toBeVisible();
  });

  test("renders tricks count", async ({ page }) => {
    await expect(page.getByText(/\d+ tricks/i).first()).toBeVisible();
  });

  test("renders difficulty filter chips", async ({ page }) => {
    await expect(page.getByText(/^All$/i).first()).toBeVisible();
    await expect(page.getByText(/^Beginner$/i).first()).toBeVisible();
    await expect(page.getByText(/^Intermediate$/i).first()).toBeVisible();
  });

  test("renders search input", async ({ page }) => {
    await expect(page.getByPlaceholder(/Search tricks/i)).toBeVisible();
  });

  test("renders trick cards with XP rewards", async ({ page }) => {
    await expect(page.getByText(/Sleeper/i).first()).toBeVisible();
    await expect(page.getByText(/\+\d+ XP/i).first()).toBeVisible();
  });

  test("renders difficulty badges on trick cards", async ({ page }) => {
    await expect(page.getByText(/Beginner/i).first()).toBeVisible();
  });
});
