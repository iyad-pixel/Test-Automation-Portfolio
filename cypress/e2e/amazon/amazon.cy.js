/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';

describe('Add Product To Cart', () => {
    before(() => {
        cy.visit('https://www.amazon.com/');
        cy.get('#nav-tools').should('be.visible');
        // cy.wait(10000)
        cy.get('#nav-global-location-popover-link').click();
        cy.get('#GLUXZipUpdateInput').click().type('24831');
        cy.get('#GLUXZipUpdate').click();
        cy.get('.a-popover-footer > .a-button').click();
    });
    //24831

    it('should search for a product and add it to cart', () => {
        cy.intercept('https://completion.amazon.com/api/2017/suggestions?limit=11&prefix=mirror**').as('searchSuggestions')
        cy.get('#twotabsearchtextbox').click().type('mirror');
        cy.wait('@searchSuggestions').its('response.statusCode').should('eq', 200);
        cy.get('#nav-search-submit-button').click();
        cy.get('[data-component-type="s-search-result"]:has([cel_widget_id^="MAIN-SEARCH_RESULTS-"])').first().then((selectedProduct) => {
            cy.get('[cel_widget_id^="MAIN-SEARCH_RESULTS-"] .a-link-normal').first().click();

            cy.get('#productTitle').then((title) => cy.wrap(title.text()).as('productTitle'));
            cy.get('#add-to-cart-button').click();
            cy.get('#nav-cart-count').should('have.text', 1)
            cy.get('#sw-gtc').click();

            cy.get(`[data-asin="${selectedProduct.attr('data-asin')}"]`).then((cartItem) => {
                cy.get('@productTitle').then((productTitle)=>{
                    expect(cartItem.text().replace(/\s\s+/g, ' ')).to.include(productTitle.replace(/\s\s+/g, ' '))

                });
            });


            cy.get('#sc-subtotal-amount-buybox').should('include.text', selectedProduct.text().match(/\$\d+\.?\d*/)[0])
        });
    });
});