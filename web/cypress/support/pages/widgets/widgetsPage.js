import WidgetsPage_ELEMENTS from "./widgetsElements";

class WidgetsPage {
    accessWidgetsPage() {
        cy.get(WidgetsPage_ELEMENTS.widgetsCard).click();
    }

    validateWidgetsPage() {
        cy.url().should('include', '/widgets');
    }
}

export default new WidgetsPage();