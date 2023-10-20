import { apiUtils } from "./apiUtils";

export class Amazon {
    // Constants
    locationZipCode = '24831';
    searchTerm = 'mirrors';


    // Locators    
    addToCartButton = '#add-to-cart-button';
    deliveryLocationButton = '#nav-global-location-popover-link';
    goToCartButton = '#sw-gtc';
    languageTools = '#nav-tools';
    navigationCartCount = '#nav-cart-count';
    productTitle = '#productTitle';
    resultLink = '[cel_widget_id^="MAIN-SEARCH_RESULTS-"] .a-link-normal';
    searchBox = '#twotabsearchtextbox';
    searchIcon = '#nav-search-submit-button';
    searchResult = '[data-component-type="s-search-result"]:has([cel_widget_id^="MAIN-SEARCH_RESULTS-"])';
    subTotal = '#sc-subtotal-amount-buybox';
    zipCodeContinue = '.a-popover-footer > .a-button';
    zipCodeInput = '#GLUXZipUpdateInput';
    zipCodeUpdate = '#GLUXZipUpdate';


    // Functions
    /**
     * Gets a product by ASIN number
     * @param serialNumber - The ASIN number of the product
     * @returns 
     */
    getProductBySerialNumber = (serialNumber) => cy.get(`[data-asin="${serialNumber}"]`);

    /**
     * Searches for a product using the search box
     * @param searchTerm - The term to search for 
     */
    searchForProduct(searchTerm) {
        cy.intercept(apiUtils.searchSuggestions).as('searchSuggestions');
        cy.get(amazon.searchBox).click().type(searchTerm);
        apiUtils.waitForSuccessStatus('@searchSuggestions');
        cy.get(amazon.searchIcon).click();
    }
}

export const amazon = new Amazon();
