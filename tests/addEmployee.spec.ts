import { test, expect } from '@playwright/test';

// Store login session
test.use({ storageState: 'storageState.json' });

test('Add an employee', async ({ page }) => {

    // Navigate to the follwing URL
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index', { waitUntil: 'load' });

    // Assert that Dashboard text is seen
    await expect(page.locator('h6')).toHaveText('Dashboard', { timeout: 10000 });

    // Fill the search input
    await page.getByPlaceholder('Search').fill('p');
    await page.locator('.oxd-main-menu-item').first().click();

    // Click button to add user
    await page.getByRole('button', { name: 'Add' }).click();

    // Assert that Add User text is seen
    await page.locator('.orangehrm-main-title').waitFor();
    await expect(page.locator('.orangehrm-main-title')).toHaveText('Add Employee', { timeout: 10000 });

    await expect(page.locator('.oxd-form-actions > p')).toHaveText(' * Required', { timeout: 10000 });

    await page.locator('.orangehrm-employee-image > p').waitFor();
    await expect(page.locator('.orangehrm-employee-image > p')).toHaveText('Accepts jpg, .png, .gif up to 1MB. Recommended dimensions: 200px X 200px', { timeout: 10000 });

    await page.locator('.employee-image').waitFor();

    await page.locator('.employee-image').click();

    // Locate the input[type="file"] and set the file(s)
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('tests/files/sample-5.png');

    await page.locator('input[name="firstName"]').waitFor();
    await page.fill('input[name="firstName"]', 'Prabhat');
    await page.fill('input[name="middleName"]', 'Singh');
    await page.fill('input[name="lastName"]', 'Jha');

    function getRandom10DigitString(): string {
        let result = '';
        for (let i = 0; i < 10; i++) {
            result += Math.floor(Math.random() * 10); // adds a digit (0–9)
        }
        return result;
    }

    const randomStr = getRandom10DigitString()

    console.log(randomStr);

    await page.fill('.oxd-grid-2.orangehrm-full-width-grid > div > div > div:nth-child(2) > input', randomStr);

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('.orangehrm-horizontal-padding.orangehrm-vertical-padding > h6')).toHaveText('Personal Details', { timeout: 10000 });

    await page.locator('form > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(2) > input').waitFor();

    await page.fill('form > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(2) > input', '321321');

    await page.fill('form > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2) > input', '098098');

    await page.getByPlaceholder('yyyy-dd-mm').nth(0).fill('2026-09-27');

    await page.locator('.oxd-select-text-input').first().click();
    await page.locator('[role="listbox"] >> text=Afghan').click();

    await page.locator('.oxd-select-text-input').nth(1).click();
    await page.locator('[role="listbox"] >> text=Single').click();
});