import { test, expect } from '@playwright/test';

test('User can log in successfully', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Fill in the login form
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');

    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for the dashboard or confirmation element
    await expect(page).toHaveURL(/dashboard/);

    // Wait for the dropdown to be appeared, so that it can be clicked
    await page.waitForSelector('.oxd-userdropdown-tab', { timeout: 10000 });
    await page.locator('.oxd-userdropdown-tab').click();

    // Assert that Logout text is seen
    await expect(page.locator('.oxd-userdropdown-link').last()).toHaveText('Logout');

    // Save session to file
    await page.context().storageState({ path: 'storageState.json' });
});
