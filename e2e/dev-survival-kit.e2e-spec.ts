import { test, expect } from '@playwright/test';

test.describe('DevSurvivalKit E2E tests', () => {
  test('user can open the home page', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('body')).toContainText(/Dev|Toolkit|Survival/i);
  });

  test('user can open Magic 8-Ball page', async ({ page }) => {
    await page.goto('/');

    await page.getByText('Magic 8-Ball for Devs').click();

    await expect(page).toHaveURL(/.*magic8ball.*/);
    await expect(page.locator('body')).toContainText(/Magic|8-Ball/i);
  });

  test('user can open Alibi Generator page', async ({ page }) => {
    await page.goto('/');

    await page.getByText('Excuse-o-Matic 3000').click();

    await expect(page).toHaveURL(/.*alibi-generator.*/);
    await expect(page.locator('body')).toContainText(/Excuse|Alibi/i);
  });
});
