const TEST_EMAIL = process.env.DETOX_TEST_EMAIL || 'test@test.com';
const TEST_PASSWORD = process.env.DETOX_TEST_PASSWORD || 'Test1234';

async function loginWithCredentials() {
  await waitFor(element(by.id('email-cpf-input'))).toBeVisible().withTimeout(8000);
  await element(by.id('email-cpf-input')).replaceText(TEST_EMAIL);
  await element(by.id('password-input')).replaceText(TEST_PASSWORD);
  await element(by.id('password-input')).tapReturnKey();
  await element(by.id('login-button')).tap();
}

async function ensureLoggedIn() {
  await device.disableSynchronization();

  let isLoggedIn = false;
  let isLoggedOut = false;
  
  // Check which screen appears first (Tab Bar or Login) using a fast polling loop
  for (let i = 0; i < 50; i++) {
    try {
      await expect(element(by.text('Perfil'))).toBeVisible();
      isLoggedIn = true;
      break;
    } catch (_) {}
    
    try {
      await expect(element(by.id('email-cpf-input'))).toBeVisible();
      isLoggedOut = true;
      break;
    } catch (_) {}
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  if (isLoggedIn) {
    return;
  }

  // If we reached here, we should proceed with the login/register flow
  try {
    // Attempt to log in with the test credentials
    await waitFor(element(by.id('email-cpf-input'))).toBeVisible().withTimeout(4000);
    await element(by.id('email-cpf-input')).replaceText(TEST_EMAIL);
    await element(by.id('password-input')).replaceText(TEST_PASSWORD);
    
    // Dismiss keyboard by tapping the logo
    try {
      await element(by.id('login-logo')).tap();
    } catch (_) {}
    
    await element(by.id('login-button')).tap();
    
    // Wait for the Tab Bar to verify login succeeded
    await waitFor(element(by.text('Perfil'))).toBeVisible().withTimeout(8000);
  } catch (loginErr) {
    // If login failed, the account probably does not exist.
    // Dismiss any "Invalid credentials" alert popup that might have appeared.
    try {
      await element(by.text('OK')).tap();
    } catch (_) {
      try {
        await element(by.text('Ok')).tap();
      } catch (_) {}
    }

    try {
      // Navigate to the register screen
      await waitFor(element(by.id('create-account-link'))).toBeVisible().withTimeout(5000);
      await element(by.id('create-account-link')).tap();

      // Fill in and submit the registration form
      await waitFor(element(by.id('register-name-input'))).toBeVisible().withTimeout(5000);
      await element(by.id('register-name-input')).replaceText('Test User');
      await element(by.id('register-email-input')).replaceText(TEST_EMAIL);
      await element(by.id('register-password-input')).replaceText(TEST_PASSWORD);
      await element(by.id('register-confirm-password-input')).replaceText(TEST_PASSWORD);
      
      // Dismiss keyboard
      try {
        await element(by.id('logo-image')).tap();
      } catch (_) {}
      
      await element(by.id('create-account-button')).tap();

      // The registration redirects back to the login page. Wait for it to become visible.
      await waitFor(element(by.id('email-cpf-input'))).toBeVisible().withTimeout(8000);

      // Perform the login attempt again with the newly registered credentials
      await element(by.id('email-cpf-input')).replaceText(TEST_EMAIL);
      await element(by.id('password-input')).replaceText(TEST_PASSWORD);
      
      // Dismiss keyboard
      try {
        await element(by.id('login-logo')).tap();
      } catch (_) {}
      
      await element(by.id('login-button')).tap();

      // Wait for the Tab Bar to confirm successful login
      await waitFor(element(by.text('Perfil'))).toBeVisible().withTimeout(10000);
    } catch (regErr) {
      throw new Error("Failed to automatically register and log in the test user: " + regErr.message);
    }
  }
}

module.exports = { loginWithCredentials, ensureLoggedIn };
