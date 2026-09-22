import { Page } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) {}

    async addProductToCart(productName: string) {
        const addToCartButton = this.page
            .getByRole('button', { name: new RegExp(`add to cart|add.*${productName}`, 'i') })
            .first();

        if (await addToCartButton.count()) {
            await addToCartButton.click();
            return;
        }

        const product = this.page
            .getByRole('link', { name: new RegExp(productName, 'i') })
            .first();

        await product.click();
    }

    async open() {
        await this.page.goto('https://example.com/products');
    }

    async selectProduct(productName: string) {
        const product = this.page
            .getByRole('link', { name: new RegExp(productName, 'i') })
            .first();

        if (await product.count()) {
            await product.click();
            return;
        }

        const fallbackProduct = this.page
            .locator('a[href]')
            .filter({ hasText: /product/i })
            .first();

        await fallbackProduct.click();
    }
}