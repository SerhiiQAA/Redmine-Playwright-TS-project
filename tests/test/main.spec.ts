import { test, expect } from '@playwright/test';
import { MainPage } from '../page/MainPage';

test('Header elements presence', async ({ page }) => {
  const mainPage = new MainPage(page);

  await mainPage.goto();
  await expect(page.locator(mainPage.selectors.loginButton)).toBeVisible();  
  await expect(page.locator(mainPage.selectors.registerButton)).toBeVisible(); 
  await expect(page.locator(mainPage.selectors.homeButton)).toBeVisible();  
  await expect(page.locator(mainPage.selectors.projectsButton)).toBeVisible(); 
  await expect(page.locator(mainPage.selectors.helpButton)).toBeVisible(); 
  await expect(page.locator(mainPage.selectors.searchField)).toBeVisible(); 
  await expect(page.locator(mainPage.selectors.searchProjectButton)).toBeVisible();  
});
