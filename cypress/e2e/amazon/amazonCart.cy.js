import { amazon } from "../../src/amazon";

describe('Add Product To Cart', () => {
    before(() => {
        cy.visit('/');
        cy.get(amazon.languageTools).should('be.visible');

        // Setup location
        cy.get(amazon.deliveryLocationButton).click();
        cy.get(amazon.zipCodeInput).click().type(amazon.locationZipCode);
        cy.get(amazon.zipCodeUpdate).click();
        cy.get(amazon.zipCodeContinue).click();
        cy.get(amazon.languageTools).should('be.visible');
    });

    it('should search for a product and add it to the cart', () => {
        // Search for an item using the search box
        amazon.searchForProduct(amazon.searchTerm);

        // Select search result
        cy.get(amazon.searchResult).first().then((selectedProduct) => {
            cy.get(amazon.resultLink).first().click();

            // Get product details for comparison
            const productPrice = selectedProduct.text().match(/\$\d+\.?\d*/)[0];
            const productSN = selectedProduct.attr('data-asin');
            cy.get(amazon.productTitle).then(title => cy.wrap(title.text().trim()).as('productTitle'));

            // Add product to cart
            cy.get(amazon.addToCartButton).click();
            cy.get(amazon.navigationCartCount).should('have.text', 1);
            cy.get(amazon.goToCartButton).click();

            // Compare the item details in the cart with the product details 
            amazon.getProductBySerialNumber(productSN).then((cartItem) => {
                const cartPrice = cartItem.text().replace(/\s\s+/g, ' ');
                cy.get('@productTitle').then((productTitle) => {
                    expect(cartPrice).to.include(productTitle);
                });
            });

            cy.get(amazon.subTotal).should('include.text', productPrice);
        });
    });
});
