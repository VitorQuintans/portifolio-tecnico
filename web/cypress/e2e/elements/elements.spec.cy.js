import ElementsPage from "../../support/pages/elements/elementsPage";

// Prevents Cypress from failing the test if external scripts/website ads return an error.
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Elements Page Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    context('Essential scenarios', () => {
        it('should visit the elements page', () => {
            ElementsPage.visitElementsPage();
            ElementsPage.validateElementsPage();
        })
    })
})

