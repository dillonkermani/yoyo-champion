import { test as base } from "@playwright/test";

/**
 * Extends base Playwright test with a page that has onboarding marked complete
 * in localStorage, so protected app routes don't redirect to /onboarding/welcome.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "yoyo-onboarding-storage",
        JSON.stringify({
          state: {
            isComplete: true,
            completedAt: "2026-01-01T00:00:00.000Z",
            skillLevel: "beginner",
            goals: ["learn_basics"],
            preferredStyles: ["1A"],
            recommendedPathId: null,
            handedness: null,
            location: null,
            favoriteYoyo: null,
            country: null,
            region: null,
          },
          version: 0,
        })
      );
    });
    await use(page);
  },
});

export { expect } from "@playwright/test";
