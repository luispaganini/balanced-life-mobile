describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
    await device.disableSynchronization();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    try {
      await device.sendKeyEvent(4);
    } catch (e) {}
  });

  it('should display login fields and show validation error on submit when empty', async () => {
    await expect(element(by.id('email-cpf-input'))).toBeVisible();
    await expect(element(by.id('password-input'))).toBeVisible();
    await expect(element(by.id('login-button'))).toBeVisible();

    await element(by.id('login-button')).tap();

    await expect(element(by.id('email-cpf-input-error'))).toBeVisible();
    await expect(element(by.id('password-input-error'))).toBeVisible();
  });

  it('should allow typing in credentials', async () => {
    await element(by.id('email-cpf-input')).replaceText('test@example.com');
    await element(by.id('password-input')).replaceText('password123');
    await element(by.id('password-input')).tapReturnKey();

    await expect(element(by.id('email-cpf-input'))).toHaveText('test@example.com');

    try {
      await device.sendKeyEvent(4);
    } catch (e) {}
  });

  it('should display the create account link', async () => {
    await expect(element(by.id('create-account-link'))).toBeVisible();
  });
});
