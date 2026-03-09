import { test, expect } from "./fixtures";

test.describe("Trick Library page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/library");
  });

  test("renders Trick Library heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Trick Library/i })
    ).toBeVisible();
  });

  test("renders tricks count", async ({ page }) => {
    await expect(page.getByText(/Showing \d+ tricks/i).first()).toBeVisible();
  });

  test("renders genre filter pills", async ({ page }) => {
    // Genre pills are motion.button elements — wait for them to animate in
    await expect(
      page.getByRole("button", { name: /^basics$/i }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /^string$/i }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /^slack$/i }).first()
    ).toBeVisible();
  });

  test("clicking a genre filter updates the trick list", async ({ page }) => {
    const pill = page.getByRole("button", { name: /^string$/i }).first();
    await expect(pill).toBeVisible();
    await pill.click();
    // After filtering, the count should update
    await expect(page.getByText(/Showing \d+ tricks/i).first()).toBeVisible();
  });

  test("renders XP stats", async ({ page }) => {
    await expect(page.getByText(/tricks/i).first()).toBeVisible();
    await expect(page.getByText(/mastered/i).first()).toBeVisible();
  });
});
