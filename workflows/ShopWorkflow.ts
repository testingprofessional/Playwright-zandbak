import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export class ShopWorkflow {
    
    constructor(
        private productsPage: ProductsPage,
        private productDetailsPage: ProductDetailsPage,
        private cartPage: CartPage,
        private checkoutPage: CheckoutPage
    ) {}


    async addProductToCart(productName: string) {
        await this.productsPage.open();
        await this.productsPage.selectProduct(productName);
        await this.productDetailsPage.addToCart();
        await this.cartPage.open();
    }

    async buyProduct(productName: string) {

        await this.addProductToCart(productName);
        await this.cartPage.checkout();
        await this.checkoutPage.completeOrder();
        await this.checkoutPage.expectOrderCompleted();
    }
}