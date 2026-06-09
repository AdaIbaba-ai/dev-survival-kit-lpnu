import { test, expect } from '@playwright/test';

test.describe('DevSurvivalKit critical user flows', () => {
  test('user can open Magic 8-Ball and reveal advice', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Your Emergency Dev Toolkit!')).toBeVisible();

    await page.getByText('Magic 8-Ball for Devs').click();

    await expect(page.getByText('Magic 8–Ball for Devs')).toBeVisible();

    await page.getByRole('button', { name: /Reveal Your Fate/i }).click();

    await expect(page.locator('.magic8-card')).toBeVisible();
  });

  test('user can open Alibi Generator and generate an excuse', async ({
                                                                        page,
                                                                      }) => {
    await page.goto('/');

    await page.getByText('Excuse-o-Matic 3000').click();

    await expect(page.getByText('The Alibi Generator')).toBeVisible();

    await page.getByRole('button', { name: /Generate My Alibi/i }).click();

    await expect(page.locator('.alibi-output')).toBeVisible();
  });
});
