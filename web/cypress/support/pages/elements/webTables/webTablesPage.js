import WebTablesElements from "./webTablesElements";

class WebTablesPage {
    accessWebTablesPage() {
        cy.get(WebTablesElements.webTablesBtn).should('be.visible')
            .and('have.text', 'Web Tables')
            .click();
    }

    validateWebTablesPage() {
        cy.url().should('include', '/webtables');
        cy.get('h1').should('have.text', 'Web Tables');
    }
}

export default new WebTablesPage();