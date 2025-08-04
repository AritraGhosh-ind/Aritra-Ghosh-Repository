import { test, expect, APIRequestContext } from '@playwright/test';

// Request context
let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: 'https://api.valentinos-magic-beans.click',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
});

test.afterAll(async ({ }) => {
  await apiContext.dispose();
});

test('has title', async ({ page }) => {
  // Make HTTP request (precondition) - create new order
  const newOrderResponse = await apiContext.post('/orders'); // simplified

  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // Make HTTP request (postcondition)
  const orderLookUpResponse = await apiContext.post('/orders/lookup'); // simplified
});

test('get started link', async ({ page }) => {
  await page.goto('/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
