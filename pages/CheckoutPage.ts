import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) {}

    async completeOrder() {
        await this.page.getByLabel(/first name/i).fill('Jane');
        await this.page.getByLabel(/last name/i).fill('Doe');
        await this.page.getByLabel(/postal code/i).fill('10001');

        await this.page
            .getByRole('button', { name: /continue|place order/i })
            .first()
            .click();
    }

    async expectOrderCompleted() {
        await expect(
            this.page.getByText(/order successfully completed/i)
        ).toBeVisible();
    }
}