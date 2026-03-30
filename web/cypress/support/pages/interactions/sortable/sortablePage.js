import SortablePage_ELEMENTS from "./sortableElements";
import Functions from "../../../../utils/functions";


class SortablePage {
    accessSortableSubMenu() {
        cy.get(SortablePage_ELEMENTS.sortableSubMenu).should('be.visible')
            .scrollIntoView().click({ force: true });
    }

    validateSortablePage() {
        cy.url().should('include', '/sortable');
        cy.get(SortablePage_ELEMENTS.sortableContainer).should('be.visible');
        cy.get(SortablePage_ELEMENTS.sortableTitle).should('be.visible').and('have.text', 'Sortable');
    }

    scrambleListToDescending() {
        const reverseOrder = ['Six', 'Five', 'Four', 'Three', 'Two', 'One'];

        reverseOrder.forEach((itemText) => {
            cy.contains(SortablePage_ELEMENTS.listItems, itemText).then($source => {
                cy.get(SortablePage_ELEMENTS.listItems).eq(0).then($target => {
                    Functions.dragAndDrop($source, $target);
                });
            });
        });
    }

    sortToAscending() {
        const ascendingOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

        ascendingOrder.forEach((itemText, expectedIndex) => {
            cy.contains(SortablePage_ELEMENTS.listItems, itemText).then($source => {
                cy.get(SortablePage_ELEMENTS.listItems).eq(expectedIndex).then($target => {
                    Functions.dragAndDrop($source, $target);
                });
            });
        });
    }

    validateAscendingOrder() {
        const expectedOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
        cy.get(SortablePage_ELEMENTS.listItems).each(($el, index) => {
            cy.wrap($el).should('have.text', expectedOrder[index]);
        });
    }
}

export default new SortablePage();