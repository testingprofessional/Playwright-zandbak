import { Page } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) {}

    async addProductToCart(productName: string) {
        // ...
    }

    async open() {

    }

    async selectProduct(productName: string) {

    }
}