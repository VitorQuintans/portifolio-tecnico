import ElementsPage from "../../support/pages/elements/elementsPage";

describe('Elements Page Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    context('Essential scenarios and Acceptance criteria', () => {
        it('should visit the elements page', () => {
            ElementsPage.visitElementsPage();
            ElementsPage.validateElementsPage();
        })
    })
})

