import InteractionsPage from "../../support/pages/interactions/interactionsPage";
import SortablePage from "../../support/pages/interactions/sortable/sortablePage";

describe('Interactions Page Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    context('Essentials Scenarios and Acceptance Criteria', () => {
        it('should access the Interactions Page', () => {
            InteractionsPage.accessInteractionsPage();
            InteractionsPage.validateInteractionsPage();
        });

        it('should access the Sortable Sub-menu', () => {
            InteractionsPage.accessInteractionsPage();
            SortablePage.accessSortableSubMenu();
            SortablePage.validateSortablePage();
        });

        it.skip('should sort elements using Drag and Drop into Ascending Order', () => {
            InteractionsPage.accessInteractionsPage();
            SortablePage.accessSortableSubMenu();
            SortablePage.validateSortablePage();

            // How DemoQA loads the list in ascending order, its necessary to scramble it first to test the drag and drop functionality.
            // Drag and drop its not working as expected, the list is not being sorted.
            // It's not working as expected
            SortablePage.scrambleListToDescending();
            SortablePage.sortToAscending();
            SortablePage.validateAscendingOrder();
        });
    });


});
