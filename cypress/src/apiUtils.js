export class ApiUtils {
    // Interception Routes
    searchSuggestions = 'https://completion.amazon.com/api/2017/suggestions?limit=11&prefix=mirror**';

    // Helper functions
    waitForSuccessStatus(alias) {
        cy.wait(alias).its('response.statusCode').should('eq', 200);
    }
}

export const apiUtils = new ApiUtils();