import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('Login with empty fields / TC 004', async () => {
  await loginPage.submitLoginForm();
  await loginPage.expectErrorMessage('Invalid user or password');
});

test('Login with invalid data', async () => {
  const invalidUser = faker.internet.username();
  const invalidPassword = faker.internet.password();

  await loginPage.fillLoginForm(invalidUser, invalidPassword);
  await loginPage.submitLoginForm();
  await loginPage.expectErrorMessage('Invalid user or password');
});

test('Login with only login', async () => {
  const validUser = faker.internet.username();

  await loginPage.fillLoginForm(validUser, '');
  await loginPage.submitLoginForm();
  await loginPage.expectErrorMessage('Invalid user or password');
});

test('Login with only password', async () => {
  const validPassword = faker.internet.password();

  await loginPage.fillLoginForm('', validPassword);
  await loginPage.submitLoginForm();
  await loginPage.expectErrorMessage('Invalid user or password');
});

