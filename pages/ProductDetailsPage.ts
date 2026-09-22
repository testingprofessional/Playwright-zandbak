import { Page } from '@playwright/test';

export class ProductDetailsPage {
    constructor(private page: Page) {}

    async addToCart() {
        await this.page
            .getByRole('button', { name: /add to cart/i })
            .first()
            .click();
    }
}