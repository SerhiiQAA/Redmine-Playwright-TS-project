import { test, expect } from '@playwright/test';
import { LostPasswordPage } from '../page/LostPasswordPage';
import { RegisterPage } from '../page/RegisterPage';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

test('Password recovery with a valid email, but without an activated account, TC005', async ({ page }) => {
  const lostPasswordPage = new LostPasswordPage(page);
  const dataPath = path.join(__dirname, '../../data/user_data.json');
  
  await new Promise(resolve => setTimeout(resolve, 500)); 

  if (!fs.existsSync(dataPath)) {
    throw new Error('user_data.json not found');
  }
  
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  if (!data.email) {
    throw new Error('Email not found in user_data.json');
  }

  const { email } = data;

  await lostPasswordPage.goto();
  await lostPasswordPage.fillEmail(email); 
  await lostPasswordPage.submitForm();
  await lostPasswordPage.expectErrorMessage('You haven\'t activated your account yet. If you want to receive a new activation email, please click this link.');
});

test('Password recovery with invalid email', async ({ page }) => {
  const lostPasswordPage = new LostPasswordPage(page);
  const randomEmail = faker.internet.email();

  await lostPasswordPage.goto();
  await lostPasswordPage.fillEmail(randomEmail);
  await lostPasswordPage.submitForm();
  await lostPasswordPage.expectErrorMessage('Unknown user.');
});

test('Password recovery with empty field', async ({ page }) => {
  const lostPasswordPage = new LostPasswordPage(page);

  await lostPasswordPage.goto();  
  await lostPasswordPage.submitForm();
  await lostPasswordPage.expectErrorMessage('Unknown user.');
});


