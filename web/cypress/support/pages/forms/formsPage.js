import formsElements from "./formsElements"

class FormsPage {
    visitForm() {
        cy.get(formsElements.formsCard, { timeout: 3000 }).should('be.visible').click()
        cy.location('href').should('include', '/forms');
    }
}


export default new FormsPage()