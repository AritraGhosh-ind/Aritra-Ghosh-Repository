import { test } from '@playwright/test';

test('should get all products', async ({ request }) => {
  const response = await request.get('/products');
  const responseBody = await response.json();
  console.log(responseBody);
});