import { test, expect } from '../fixtures/test';

test('user can login', async ({ loginPage }) => {

    await loginPage.login(
        process.env.TEST_USERNAME!,
        process.env.TEST_PASSWORD
    );

    // controleer hier dat de gebruiker succesvol is ingelogd
});