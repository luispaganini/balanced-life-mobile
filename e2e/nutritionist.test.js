const { ensureLoggedIn } = require('./helpers/login');

describe('Nutritionist Screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
    await device.disableSynchronization();
    await ensureLoggedIn();
    await element(by.text('Nutricionista')).tap();
    await waitFor(element(by.id('nutritionist-header'))).toBeVisible().withTimeout(8000);
  });

  it('should display the nutritionist header', async () => {
    await expect(element(by.id('nutritionist-header'))).toBeVisible();
  });

  it('should display empty state when no nutritionist is linked', async () => {
    await waitFor(element(by.id('nutritionist-empty-text'))).toBeVisible().withTimeout(8000);
    await expect(element(by.id('nutritionist-empty-text'))).toBeVisible();
  });
});
