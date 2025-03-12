import { test, expect } from '@playwright/test';
import { LostPasswordPage } from '../page/LostPasswordPage';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

let lostPasswordPage;

test.beforeEach(async ({ page }) => {
  lostPasswordPage = new LostPasswordPage(page);
  await lostPasswordPage.goto();
});

test('Password recovery with a valid email, but without an activated account, TC005', async () => {
  const dataPath = path.join(__dirname, '../../data/user_data.json');

  if (!fs.existsSync(dataPath)) {
    throw new Error('user_data.json not found');
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  if (!data.email) {
    throw new Error('Email not found in user_data.json');
  }

  const { email } = data;

  await lostPasswordPage.fillEmail(email);
  await lostPasswordPage.submitForm();
  await lostPasswordPage.expectErrorMessage('You haven\'t activated your account yet. If you want to receive a new activation email, please click this link.');
});

test('Password recovery with invalid email', async () => {
  const randomEmail = faker.internet.email();

  await lostPasswordPage.fillEmail(randomEmail);
  await lostPasswordPage.submitForm();
  await lostPasswordPage.expectErrorMessage('Unknown user.');
});

test('Password recovery with empty field', async () => {
  await lostPasswordPage.submitForm();
  await lostPasswordPage.expectErrorMessage('Unknown user.');
});

