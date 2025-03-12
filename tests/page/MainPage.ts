import { Page } from '@playwright/test';

class MainPage {

  public selectors = {
      loginButton: '.login',
      registerButton: '.register',
      homeButton: '.home',
      projectsButton: '//a[@class="projects"]',
      helpButton: '.help',
      searchField: '//input[@class="small"]',
      searchProjectButton: '#project-jump',
      searchProjectField: '#projects-quick-search',
    };

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async clickLogin() {
    await this.page.locator(this.selectors.loginButton).click();
  }

  async clickRegister() {
    await this.page.locator(this.selectors.registerButton).click();
  }

  async clickHome() {
    await this.page.locator(this.selectors.homeButton).click();
  }

  async clickProjects() {
    await this.page.locator(this.selectors.projectsButton).click();
  }

  async clickHelp() {
    await this.page.locator(this.selectors.helpButton).click();
  }

  async fillSearchField(text: string) {
    await this.page.locator(this.selectors.searchField).fill(text);
  }

  async clickSearchProject() {
    await this.page.locator(this.selectors.searchProjectButton).click();
  }

  async fillSearchProjectField(text: string) {
    await this.page.locator(this.selectors.searchProjectField).fill(text);
  }
}

export { MainPage };
