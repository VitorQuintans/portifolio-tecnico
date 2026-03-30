import InteractionsPage from "../../support/pages/interactions/interactionsPage";
import SortablePage from "../../support/pages/interactions/sortable/sortablePage";

// Prevents Cypress from failing the test if external scripts/website ads return an error.
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Interactions Page Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    context('Essentials Scenarios and Acceptance Criteria', () => {
        it('should access the Interactions Page', () => {
            InteractionsPage.accessInteractionsPage();
            InteractionsPage.validateInteractionsPage();
        });

        it('should access the Sortable Sub-menu', () => {
            InteractionsPage.accessInteractionsPage();
            SortablePage.accessSortableSubMenu();
            SortablePage.validateSortablePage();
        });
    });


});
