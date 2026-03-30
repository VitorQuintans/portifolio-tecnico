import WebTablesPage from "../../../support/pages/elements/webTables/webTablesPage";
import ElementsPage from "../../../support/pages/elements/elementsPage";

// Prevents Cypress from failing the test if external scripts/website ads return an error.
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

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

    context.only('Web Tables CRUD operations', () => {
        it('should create a new record', () => {
            ElementsPage.visitElementsPage();
            WebTablesPage.accessWebTablesPage();
            WebTablesPage.creatingNewRecord();
            WebTablesPage.validateDataUserOnWebTables();
        });

        it('should update a record', () => {
            ElementsPage.visitElementsPage();
            WebTablesPage.accessWebTablesPage();
            WebTablesPage.creatingNewRecord();
            WebTablesPage.validateDataUserOnWebTables();
            WebTablesPage.updateRecordOnWebTables();
            WebTablesPage.validateDataUserOnWebTables();
        });

        it('should delete a record', () => {
            ElementsPage.visitElementsPage();
            WebTablesPage.accessWebTablesPage();
            WebTablesPage.creatingNewRecord();
            WebTablesPage.validateDataUserOnWebTables();
            WebTablesPage.deleteRecordOnWebTables();
            WebTablesPage.validateDeleteRecordOnWebTables();
        });

    });


});
