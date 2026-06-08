const { ensureLoggedIn } = require('./helpers/login');

describe('Home / Diary Screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
    await device.disableSynchronization();
    await ensureLoggedIn();
    await waitFor(element(by.id('home-calendar-scroll'))).toBeVisible().withTimeout(8000);
  });

  it('should display the weekly calendar', async () => {
    await expect(element(by.id('home-calendar-scroll'))).toBeVisible();
  });

  it('should display the daily summary card', async () => {
    await expect(element(by.id('home-daily-summary-card'))).toBeVisible();
  });

  it('should display the meals header', async () => {
    await expect(element(by.id('home-meals-header'))).toBeVisible();
  });
});
