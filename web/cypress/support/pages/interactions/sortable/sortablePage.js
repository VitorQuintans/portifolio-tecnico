import SortablePage_ELEMENTS from "./sortableElements";


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
}

export default new SortablePage();