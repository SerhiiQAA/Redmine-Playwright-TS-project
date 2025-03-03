import { Page, expect } from '@playwright/test';

class RegisterPage {
  public selectors = {
    header: '//h2',
    userLogin: '//input[@id="user_login"]',
    userPassword: '//input[@id="user_password"]',
    userPasswordConfirmation: '//input[@id="user_password_confirmation"]',
    userFirstName: '//input[@id="user_firstname"]',
    userLastName: '//input[@id="user_lastname"]',
    userEmail: '//input[@id="user_mail"]',
    hideEmailCheckbox: '//input[@id="pref_hide_mail"]',
    userLanguage: '//select[@id="user_language"]',
    organization: '//input[@id="user_custom_field_values_5"]',
    location: '//input[@id="user_custom_field_values_6"]',
    ircNick: '//input[@id="user_custom_field_values_3"]',
    submitButton: '//input[@type="submit"]',
    errorMessages: '//div[@id="errorExplanation"]//li'
  };

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('register');
  }

  async fillRegisterForm(data: Partial<{ login: string, password: string, confirmPassword: string, firstName: string, lastName: string, email: string, organization: string, location: string, ircNick: string }>) {
    if (data.login !== undefined) {
      await this.page.locator(this.selectors.userLogin).fill(data.login);
    }
    if (data.password !== undefined) {
      await this.page.locator(this.selectors.userPassword).fill(data.password);
    }
    if (data.confirmPassword !== undefined) {
      await this.page.locator(this.selectors.userPasswordConfirmation).fill(data.confirmPassword);
    }
    if (data.firstName !== undefined) {
      await this.page.locator(this.selectors.userFirstName).fill(data.firstName);
    }
    if (data.lastName !== undefined) {
      await this.page.locator(this.selectors.userLastName).fill(data.lastName);
    }
    if (data.email !== undefined) {
      await this.page.locator(this.selectors.userEmail).fill(data.email);
    }
    if (data.organization !== undefined) {
      await this.page.locator(this.selectors.organization).fill(data.organization);
    }
    if (data.location !== undefined) {
      await this.page.locator(this.selectors.location).fill(data.location);
    }
    if (data.ircNick !== undefined) {
      await this.page.locator(this.selectors.ircNick).fill(data.ircNick);
    }
  }

  async submit() {
    await this.page.locator(this.selectors.submitButton).click();
  }

  async getErrorMessages() {
    return this.page.locator(this.selectors.errorMessages).allTextContents();
  }

  getUserLoginField() {
    return this.page.locator(this.selectors.userLogin);
  }

  async expectErrorMessages(messages: string[]) {
    const errorMessages = await this.getErrorMessages();
    messages.forEach(message => {
      expect(errorMessages).toContain(message);
    });
  }
}

export { RegisterPage };
