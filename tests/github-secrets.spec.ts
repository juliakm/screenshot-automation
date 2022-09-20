import { test, expect } from '@playwright/test';

const sharp = require('sharp');
var screenshotFolder = "screenshots/github-actions/";
var screenshot1 = screenshotFolder + "github-actions-secret-menu";
var screenshot2 = screenshotFolder + "github-actions-add-secret";

var passwordName = "AZURE_CREDENTIALS";
var passwordValue = `{
    "appId": "generated-app-ID",
    "displayName": "dummy-app-name",
    "name": "http://dummy-app-name",
    "password": "random-password",
    "tenant": "tenant-ID"
    }`;


test.use({ storageState: "auth.json" });

test('Secrets are visible', async ({ page }) => {
    await page.goto('https://github.com/juliakm/yaml-samples/settings');
  
    // Click #settings-tab
    await expect(page).toHaveURL('https://github.com/juliakm/yaml-samples/settings');

    // Check for menu item "Secrets"
    await page.locator('button:has-text("Secrets")').click();


   // Click text=Actions >> nth=3
   await page.locator('text=Actions').nth(3).click();

   //wait for secrets menu item to be visible 
   await expect(page.locator('[data-item-id="secrets"]')).toBeVisible()
   await page.locator('[data-item-id="secrets"]').screenshot({ path: screenshot1 + '.png' });
   await sharp(screenshot1 + '.png')
            .resize({width: 240})
            .toFile(screenshot1 + '-240px.png');



    //await page.locator('text=Actions').nth(3).screenshot({ path: 'secrets-screenshot.png' });
    await expect(page).toHaveURL('https://github.com/juliakm/yaml-samples/settings/secrets/actions');


    // Click text=New repository secret
    await page.locator('text=New repository secret').click();
    await expect(page).toHaveURL('https://github.com/juliakm/yaml-samples/settings/secrets/actions/new');


    // Populate secret fields
    await page.locator('#secret_name').fill(passwordName);
    await page.locator('#secret_value').fill(passwordValue);

    // Take a screenshot of window to add secret
    await page.locator('.container-md').screenshot({ path: screenshot2 + '.png' });

});
  