import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

test('Login with empty fields, TC004', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.submitLoginForm();
  await loginPage.getErrorMessage('Invalid user or password');
});

test('login with invalid data', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const invalidUser = faker.internet.username();
  const invalidPassword = faker.internet.password();

  await loginPage.goto();
  await loginPage.fillLoginForm(invalidUser, invalidPassword);
  await loginPage.submitLoginForm();
  await loginPage.getErrorMessage('Invalid user or password');
});

test('login with only login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const validUser = faker.internet.username();

  await loginPage.goto();
  await loginPage.fillLoginForm(validUser, '');
  await loginPage.submitLoginForm();
  await loginPage.getErrorMessage('Invalid user or password');
});

test('login with only password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const validPassword = faker.internet.password();

  await loginPage.goto();
  await loginPage.fillLoginForm('', validPassword);
  await loginPage.submitLoginForm();
  await loginPage.getErrorMessage('Invalid user or password');
});


