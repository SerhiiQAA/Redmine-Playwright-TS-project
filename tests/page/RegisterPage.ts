import { Page, expect } from '@playwright/test';

class RegisterPage {
  public selectors = {
    header: '//h2',
    userLogin: '#user_login',
    userPassword: '#user_password',
    userPasswordConfirmation: '#user_password_confirmation',
    userFirstName: '#user_firstname',
    userLastName: '#user_lastname',
    userEmail: '#user_mail',
    hideEmailCheckbox: '#pref_hide_mail',
    userLanguage: '#user_language',
    organization: '#user_custom_field_values_5',
    location: '#user_custom_field_values_6',
    ircNick: '#user_custom_field_values_3',
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
