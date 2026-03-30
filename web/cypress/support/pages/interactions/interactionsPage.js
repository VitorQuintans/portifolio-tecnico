import InteractionsPage_ELEMENTS from "./interactionsElements";


class InteractionsPage {
    accessInteractionsPage() {
        cy.get(InteractionsPage_ELEMENTS.interactionCard).should('be.visible')
            .scrollIntoView().click({ force: true });
    }

    validateInteractionsPage() {
        cy.url().should('include', '/interaction');
        cy.get(InteractionsPage_ELEMENTS.sortableSubMenu).should('be.visible');
    }
}

export default new InteractionsPage();