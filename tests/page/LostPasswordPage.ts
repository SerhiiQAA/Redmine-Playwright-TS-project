import { Page, expect } from '@playwright/test';

class LostPasswordPage {
  public selectors = {
    header: '//h2',
    emailInput: '//input[@id="mail"]',
    submitButton: '//input[@type="submit"]',
    errorMessage: '//div[@id="flash_error"]',
  };

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('account/lost_password');
  }

  async fillEmail(email: string) {
    await this.page.locator(this.selectors.emailInput).fill(email);
  }

  async submitForm() {
    await this.page.locator(this.selectors.submitButton).click();
  }

  async expectHeaderText(expectedText: string) {
    await expect(this.page.locator(this.selectors.header)).toHaveText(expectedText);
  }

  async expectErrorMessage(expectedText: string) {
    await this.page.waitForSelector(this.selectors.errorMessage);
    await expect(this.page.locator(this.selectors.errorMessage)).toHaveText(expectedText);
  }
}

export { LostPasswordPage };

