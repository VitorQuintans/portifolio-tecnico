import FormsPage from '../../support/pages/forms/formsPage'

// Prevents Cypress from failing the test if external scripts/website ads return an error.
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Forms Pages Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    context('Successful scenarios and Acceptance Criteria', () => {
        context('Essential scenarios', () => {
            it('should visit the forms page', () => {
                FormsPage.visitForm();
            })

            it('should visit the practice form page', () => {
                FormsPage.visitForm();
                FormsPage.visitPracticeForm();
            })
        })

        context('Interactive scenarios with forms', () => {
            it('should fill the practice form with faker data', () => {
                FormsPage.visitForm();
                FormsPage.visitPracticeForm();
                FormsPage.fillPracticeForm();
            })

            it('should validate the practice form if is filled correctly', () => {
                FormsPage.visitForm();
                FormsPage.visitPracticeForm();
                FormsPage.fillPracticeForm();
                FormsPage.validatePracticeForm();
            })
        })
    })
})