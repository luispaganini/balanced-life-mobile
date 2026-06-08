const { ensureLoggedIn } = require('./helpers/login');

describe('Profile Screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
    await device.disableSynchronization();
    await ensureLoggedIn();
    await element(by.text('Perfil')).tap();
    await waitFor(element(by.id('profile-header'))).toBeVisible().withTimeout(8000);
  });

  it('should display the profile header', async () => {
    await expect(element(by.id('profile-header'))).toBeVisible();
  });

  it('should display change password button', async () => {
    await expect(element(by.id('change-password-button'))).toBeVisible();
  });

  it('should display logout button', async () => {
    await expect(element(by.id('logout-button'))).toExist();
  });

  it('should navigate to change password screen and show form fields', async () => {
    await element(by.id('change-password-button')).tap();

    await waitFor(element(by.id('new-password-input'))).toBeVisible().withTimeout(5000);
    await expect(element(by.id('confirm-password-input'))).toBeVisible();
    await expect(element(by.id('save-password-button'))).toBeVisible();
  });

  it('should show validation errors on empty password submit', async () => {
    await waitFor(element(by.id('save-password-button'))).toBeVisible().withTimeout(5000);
    await element(by.id('save-password-button')).tap();

    await waitFor(element(by.id('new-password-input-error'))).toBeVisible().withTimeout(5000);
    await expect(element(by.id('confirm-password-input-error'))).toBeVisible();
  });
});
