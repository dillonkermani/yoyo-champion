import { test, expect } from "@playwright/test";

test.describe("Onboarding flow", () => {
  test("renders onboarding welcome page", async ({ page }) => {
    await page.goto("/onboarding");
    // Should not redirect away — page should render something
    await expect(page).toHaveURL(/\/onboarding/);
  });

  test("welcome variant renders skill level step", async ({ page }) => {
    await page.goto("/onboarding/welcome");
    await expect(page).toHaveURL(/\/onboarding/);
  });

  test("skill-level step renders", async ({ page }) => {
    await page.goto("/onboarding/skill-level");
    await expect(page).toHaveURL(/\/onboarding/);
  });

  test("goals step renders", async ({ page }) => {
    await page.goto("/onboarding/goals");
    await expect(page).toHaveURL(/\/onboarding/);
  });

  test("styles step renders", async ({ page }) => {
    await page.goto("/onboarding/styles");
    await expect(page).toHaveURL(/\/onboarding/);
  });

  test("recommendation step renders", async ({ page }) => {
    await page.goto("/onboarding/recommendation");
    await expect(page).toHaveURL(/\/onboarding/);
  });
});
