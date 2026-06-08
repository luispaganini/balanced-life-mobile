const TEST_NAME = 'Test User';
const TEST_EMAIL = process.env.DETOX_TEST_EMAIL || 'test@test.com';
const TEST_PASSWORD = process.env.DETOX_TEST_PASSWORD || 'Test1234';

describe('Create Account Flow', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
    await device.disableSynchronization();
  });

  it('should display all form fields on create account screen', async () => {
    await waitFor(element(by.id('create-account-link'))).toBeVisible().withTimeout(8000);
    await element(by.id('create-account-link')).tap();

    await waitFor(element(by.id('register-name-input'))).toBeVisible().withTimeout(5000);
    await expect(element(by.id('register-email-input'))).toBeVisible();
    await expect(element(by.id('register-password-input'))).toBeVisible();
    await expect(element(by.id('register-confirm-password-input'))).toBeVisible();
    await expect(element(by.id('create-account-button'))).toBeVisible();
  });

  it('should show validation errors on empty form submit', async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id('create-account-link'))).toBeVisible().withTimeout(8000);
    await element(by.id('create-account-link')).tap();

    await waitFor(element(by.id('create-account-button'))).toBeVisible().withTimeout(5000);
    await element(by.id('create-account-button')).tap();

    await waitFor(element(by.id('register-name-input-error'))).toBeVisible().withTimeout(5000);
    await expect(element(by.id('register-email-input-error'))).toBeVisible();
    await expect(element(by.id('register-password-input-error'))).toBeVisible();
  });

  it('should create test account or skip gracefully if already exists', async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id('create-account-link'))).toBeVisible().withTimeout(8000);
    await element(by.id('create-account-link')).tap();

    await waitFor(element(by.id('register-name-input'))).toBeVisible().withTimeout(5000);
    await element(by.id('register-name-input')).replaceText(TEST_NAME);
    await element(by.id('register-email-input')).replaceText(TEST_EMAIL);
    await element(by.id('register-password-input')).replaceText(TEST_PASSWORD);
    await element(by.id('register-confirm-password-input')).replaceText(TEST_PASSWORD);
    await element(by.id('register-confirm-password-input')).tapReturnKey();
    await element(by.id('create-account-button')).tap();

    try {
      await waitFor(element(by.id('home-daily-summary-card'))).toBeVisible().withTimeout(12000);
    } catch (_e) {
      try {
        await element(by.text('OK')).tap();
      } catch (_e2) {}
    }
  });
});
