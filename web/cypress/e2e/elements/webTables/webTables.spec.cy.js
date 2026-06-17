import WebTablesPage from "../../../support/pages/elements/webTables/webTablesPage";
import ElementsPage from "../../../support/pages/elements/elementsPage";

describe('WebTables Tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.removeAds();
    });

    context('Essential scenarios and Acceptance criteria', () => {
        it('should visit the web tables page', () => {
            ElementsPage.visitElementsPage();
            WebTablesPage.accessWebTablesPage();
            WebTablesPage.validateWebTablesPage();
        });
    });

    context('Web Tables CRUD operations', () => {
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
            WebTablesPage.validateRecordDeletedOnWebTables();
        });
    });

    context('Negative scenarios and validations', () => {
        it('should not create a record with empty required fields', () => {
            ElementsPage.visitElementsPage();
            WebTablesPage.accessWebTablesPage();
            WebTablesPage.submitEmptyForm();
            WebTablesPage.validateFormValidationFeedback();
        });

        it('should not create a record with invalid email format', () => {
            ElementsPage.visitElementsPage();
            WebTablesPage.accessWebTablesPage();
            WebTablesPage.submitInvalidEmail('invalid-email-format');
            WebTablesPage.validateEmailInvalidFeedback();
        });
    });

});
