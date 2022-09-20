import { test, expect } from '@playwright/test';

test.use({ storageState: "auth.json" });

test('Secrets are visible', async ({ page }) => {
    await page.goto('https://github.com/juliakm/yaml-samples/settings');
  
    // Click #settings-tab
    await expect(page).toHaveURL('https://github.com/juliakm/yaml-samples/settings');

    // Check for menu item "Secrets"
    await page.locator('button:has-text("Secrets")').click();

    // Open Secrets - Actions
    await page.locator('text=Actions').nth(3).click();
    await expect(page).toHaveURL('https://github.com/juliakm/yaml-samples/settings/secrets/actions');
  
    
    // Take a screenshot (Julia add)
    await page.screenshot({ path: 'screenshot.png' });
    await page.locator('data-item-id=secrets').screenshot({ path: 'secrets-screenshot.png' });
  
});
  