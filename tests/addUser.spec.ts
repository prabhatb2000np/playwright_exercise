import { test, expect } from '@playwright/test';

// Store login session
test.use({ storageState: 'storageState.json' });

test('Add a user', async ({ page }) => {

    // Navigate to the follwing URL
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

    // Assert that Dashboard text is seen
    await expect(page.locator('h6')).toHaveText('Dashboard', { timeout: 10000 });

    // Fill the search input
    await page.getByPlaceholder('Search').fill('a');

    // Assert that search results are seen and particular value can be selected
    await expect(page.locator('.oxd-main-menu-item').first()).toHaveText('Admin');
    await expect(page.locator('.oxd-main-menu-item').last()).toHaveText('Claim');
    await page.locator('.oxd-main-menu-item').first().click();

    // Click button to add user
    await page.getByRole('button', { name: 'Add' }).click();

    // Assert that Add User text is seen
    await page.locator('h6').last().waitFor();
    await expect(page.locator('h6').last()).toHaveText('Add User');


    // Click dropdown menu so particular value can be selected
    await page.locator('.oxd-select-text-input').first().click();
    await page.locator('[role="listbox"] >> text=Admin').click();

    // Search for particular value so, related value from search results can be selected
    await page.getByPlaceholder('Type for hints...').fill('r', { timeout: 10000 });
    await page.locator('[role="listbox"] >> text=john').click({ timeout: 10000 });

    // Click dropdown menu so particular value can be selected
    await page.locator('.oxd-select-text-input').nth(1).click();
    await page.locator('[role="listbox"] >> text=Enabled').click();

    // Fill username
    await page.locator('.oxd-input').nth(1).fill('MySecret123');

    // Fill password
    await page.getByRole('textbox').nth(3).fill('MySecret123');
    await page.getByRole('textbox').nth(4).fill('MySecret123');

    // Click Save button
    await page.getByRole('button', { name: 'Save' }).click();

    // Assert that username is displayed in the table
    const row = page.locator('[role="row"]', { hasText: 'MySecret123' });
    await expect(row).toBeVisible();
});