const { ensureLoggedIn } = require('./helpers/login');

describe('Water Screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
    await device.disableSynchronization();
    await ensureLoggedIn();
    await element(by.text('Água')).tap();
    await waitFor(element(by.id('water-goal-card'))).toBeVisible().withTimeout(8000);
  });

  it('should display the water goal card', async () => {
    await expect(element(by.id('water-goal-card'))).toBeVisible();
  });

  it('should display quick add buttons', async () => {
    await expect(element(by.id('quick-add-150'))).toBeVisible();
    await expect(element(by.id('quick-add-250'))).toBeVisible();
    await expect(element(by.id('quick-add-500'))).toBeVisible();
  });

  it('should display the custom water input section', async () => {
    await expect(element(by.id('add-water-btn'))).toBeVisible();
    await expect(element(by.id('remove-water-btn'))).toBeVisible();
  });

  it('should tap quick add 250ml without error', async () => {
    await element(by.id('quick-add-250')).tap();
    await expect(element(by.id('water-goal-card'))).toBeVisible();
  });
});
