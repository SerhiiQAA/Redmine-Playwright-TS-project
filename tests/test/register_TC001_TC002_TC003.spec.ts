import { test, expect } from '@playwright/test';
import { MainPage } from '../page/MainPage';
import { RegisterPage } from '../page/RegisterPage';
import { LoginPage } from '../page/LoginPage';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

let mainPage;
let registerPage;
let loginPage;
let userData = {
  login: '',
  email: '',
  password: ''
};

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  registerPage = new RegisterPage(page);
  loginPage = new LoginPage(page);
  await mainPage.goto();
});

test('Registration with valid data, TC001', async () => {
  await mainPage.clickRegister();

  userData.password = faker.internet.password({ length: 10 });
  userData.email = faker.internet.email();
  userData.login = faker.internet.displayName();

  const newUser = {
    login: userData.login,
    password: userData.password,
    confirmPassword: userData.password,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: userData.email,
    organization: faker.company.name(),
    location: faker.location.city(),
    ircNick: faker.internet.displayName(),
  };

  await registerPage.fillRegisterForm(newUser);
  await registerPage.registerButtonClick();

  const successMessage = `Account was successfully created. An email containing the instructions to activate your account was sent to ${userData.email}.`;
  await expect(registerPage.page).toHaveURL('/login');
  await loginPage.expectSuccessMessage(successMessage);

  const dataPath = path.join(__dirname, '../../data/user_data.json');
  fs.writeFileSync(dataPath, JSON.stringify({ login: userData.login, email: userData.email, password: userData.password }));
});

test('Registration with empty fields, TC002', async () => {
  await mainPage.clickRegister();
  await registerPage.registerButtonClick();

  await expect(registerPage.getUserLoginField()).not.toHaveCSS('caret-color', 'auto'); //cursor
  await registerPage.expectErrorMessages([
    'Email cannot be blank',
    'Login cannot be blank',
    'First name cannot be blank',
    'Last name cannot be blank',
    'Password is too short (minimum is 8 characters)'
  ]);
});

test('Registration with different passwords, TC003', async () => {
  await mainPage.clickRegister();

  const newUser = {
    login: faker.internet.displayName(),
    password: faker.internet.password({ length: 10 }),
    confirmPassword: faker.internet.password({ length: 10 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    organization: faker.company.name(),
    location: faker.location.city(),
    ircNick: faker.internet.displayName(),
  };

  await registerPage.fillRegisterForm(newUser);
  await registerPage.registerButtonClick();

  await registerPage.expectErrorMessages(['Password doesn\'t match confirmation']);
});

test('Registration without required fields, TC004', async () => {
  await mainPage.clickRegister();

  const incompleteData = {
    organization: faker.company.name(),
    location: faker.location.city(),
    ircNick: faker.internet.displayName(),
  };

  await registerPage.fillRegisterForm(incompleteData);
  await registerPage.registerButtonClick();

  await registerPage.expectErrorMessages([
    'Email cannot be blank',
    'Login cannot be blank',
    'First name cannot be blank',
    'Last name cannot be blank',
    'Password is too short (minimum is 8 characters)'
  ]);
});
