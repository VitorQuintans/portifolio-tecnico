import WidgetsPage from "../../support/pages/widgets/widgetsPage";

describe('Widgets Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    context('Essentials Scenarios and Acceptance Criteria', () => {
        it('should access the Widgets Page', () => {
            WidgetsPage.accessWidgetsPage();
            WidgetsPage.validateWidgetsPage();
        });
    });
});