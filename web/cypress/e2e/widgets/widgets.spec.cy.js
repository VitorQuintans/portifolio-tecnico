import WidgetsPage from "../../support/pages/widgets/widgetsPage";
import ProgressBarPage from "../../support/pages/widgets/progressBar/progressBarPage";

// Prevents Cypress from failing the test if external scripts/website ads return an error.
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Widgets Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    context('Essentials Scenarios and Acceptance Criteria', () => {
        it('should access the Widgets Page', () => {
            WidgetsPage.accessWidgetsPage();
            WidgetsPage.validateWidgetsPage();
        });

        it('should interact with the Progress Bar according to Acceptance Criteria', () => {
            WidgetsPage.accessWidgetsPage();
            ProgressBarPage.accessProgressBarPage();
            ProgressBarPage.validateProgressBarPage();

            ProgressBarPage.startProgressBar();

            ProgressBarPage.stopBefore(25);

            ProgressBarPage.validateProgress(25);

            ProgressBarPage.startAndResetAt100();
        });
    });
});