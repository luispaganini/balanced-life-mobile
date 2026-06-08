const { ensureLoggedIn } = require('./helpers/login');

describe('Body Screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
    await device.disableSynchronization();
    await ensureLoggedIn();
    await element(by.text('Corpo')).tap();
    await waitFor(element(by.id('my-body-header'))).toBeVisible().withTimeout(8000);
  });

  it('should display My Body header', async () => {
    await expect(element(by.id('my-body-header'))).toBeVisible();
  });

  it('should display update body data button', async () => {
    await waitFor(element(by.id('update-body-data-button'))).toBeVisible().withTimeout(8000);
    await expect(element(by.id('update-body-data-button'))).toBeVisible();
  });

  it('should navigate to Add Body Data page and show form fields', async () => {
    await waitFor(element(by.id('update-body-data-button'))).toBeVisible().withTimeout(8000);
    await element(by.id('update-body-data-button')).tap();

    await waitFor(element(by.id('add-body-data-header'))).toBeVisible().withTimeout(5000);
  });
});
