import ElementsPageElements from "./elementspageElements";

class ElementsPage {
    visitElementsPage() {
        cy.get(ElementsPageElements.elementsCard).should('be.visible').click();
    }

    validateElementsPage() {
        cy.url().should('include', '/elements');
    }
}

export default new ElementsPage();