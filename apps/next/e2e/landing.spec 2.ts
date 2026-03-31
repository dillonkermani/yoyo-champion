import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders hero heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: /Become the Yo-Yo Player You Were Meant to Be/i,
      })
    ).toBeVisible();
  });

  test("renders Start Learning Free CTA", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /Start Learning Free/i }).first()
    ).toBeVisible();
  });

  test("renders View Curriculum link", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /View Curriculum/i })
    ).toBeVisible();
  });

  test("Start Learning Free navigates to /onboarding", async ({ page }) => {
    await page.getByRole("link", { name: /Start Learning Free/i }).first().click();
    await expect(page).toHaveURL(/\/onboarding/);
  });

  test("View Curriculum navigates to /curriculum", async ({ page }) => {
    await page.getByRole("link", { name: /View Curriculum/i }).click();
    await expect(page).toHaveURL(/\/curriculum/);
  });

  test("renders features section", async ({ page }) => {
    await expect(
      page.getByText(/Premium Video Tutorials/i)
    ).toBeVisible();
  });

  test("renders skill level cards", async ({ page }) => {
    await expect(page.getByText(/Beginner/i).first()).toBeVisible();
    await expect(page.getByText(/Intermediate/i).first()).toBeVisible();
    await expect(page.getByText(/Advanced/i).first()).toBeVisible();
    await expect(page.getByText(/Master/i).first()).toBeVisible();
  });

  test("renders testimonials section", async ({ page }) => {
    await expect(
      page.getByText(/Trusted by Throwers Worldwide/i)
    ).toBeVisible();
  });

  test("renders Get Started Free CTA in footer section", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /Get Started Free/i }).first()
    ).toBeVisible();
  });
});
