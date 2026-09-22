import { expect, Page } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) {}

    async open() {
        await this.page.goto('https://example.com/cart');
    }

    async checkout() {
        await this.page
            .getByRole('button', { name: /checkout/i })
            .first()
            .click();
    }

    async expectProductInCart(productName: string) {
        await expect(
            this.page.getByRole('link', { name: new RegExp(productName, 'i') }).first()
        ).toBeVisible();
    }
}