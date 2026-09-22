import { test } from '../fixtures/test';

test('user can add a product to the cart', async ({ shopWorkflow, cartPage }) => {
    const productName = 'Sample Product';

    await shopWorkflow.addProductToCart(productName);
    await cartPage.expectProductInCart(productName);
});
