import { test } from '@playwright/test';

test('should get all products', async ({ request }) => {
    // Make HTTP request
    const response = await request.get('/products');
    // Parse JSON response
    const responseBody = await response.json();
    // Log response body
    console.log(responseBody);
});