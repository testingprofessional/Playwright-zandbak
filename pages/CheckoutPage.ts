import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) {}

    async completeOrder() {

    }

    async expectOrderCompleted() {
        await expect(
            this.page.getByText('Order successfully completed')
        ).toBeVisible();
    }
}