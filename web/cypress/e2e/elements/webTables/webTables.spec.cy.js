import WebTablesPage from "../../../support/pages/elements/webTables/webTablesPage";
import ElementsPage from "../../../support/pages/elements/elementsPage";

describe('WebTables Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    context('Essential scenarios and Acceptance criteria', () => {
        it('should visit the web tables page', () => {
            ElementsPage.visitElementsPage();
            WebTablesPage.accessWebTablesPage();
            WebTablesPage.validateWebTablesPage();
        });
    });
});
