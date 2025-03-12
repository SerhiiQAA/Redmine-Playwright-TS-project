import { Page, expect } from '@playwright/test';

class LoginPage {

  public selectors = {
      usernameField: '#username',
      passwordField: '#password',
      lostPasswordLink: '.lost_password',
      rememberMeCheckbox: '//input[@type="checkbox"]',
      loginButton: '#login-submit',
      errorMessage: '#flash_error',
      successMessage: '#flash_notice',
    };

  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto('login');
  }

  async fillLoginForm(username: string, password: string) {
    await this.page.locator(this.selectors.usernameField).fill(username);
    await this.page.locator(this.selectors.passwordField).fill(password);
  }

  async submitLoginForm() {
    await this.page.locator(this.selectors.loginButton).click();
  }

  async checkRememberMe() {
    await this.page.locator(this.selectors.rememberMeCheckbox).check();
    await expect(this.page.locator(this.selectors.rememberMeCheckbox)).toBeChecked();
  }

  async clickLostPassword() {
    await this.page.locator(this.selectors.lostPasswordLink).click();
  }

  async getErrorMessage(p0: string) {
    const errorMessageLocator = this.page.locator(this.selectors.errorMessage);
    await errorMessageLocator.waitFor({ state: 'visible', timeout: 60000 });
    return errorMessageLocator.textContent();
  }

  async getSuccessMessage() {
    return this.page.locator(this.selectors.successMessage).textContent();
  }

  async expectSuccessMessage(expectedMessage: string) {
    await expect(this.page.locator(this.selectors.successMessage)).toHaveText(expectedMessage);
  }

  async expectErrorMessage(expectedMessage: string) {
    await expect(this.page.locator(this.selectors.errorMessage)).toHaveText(expectedMessage);
  }
}

export { LoginPage };
