import FormsPage from '../../support/pages/forms/formsPage'

describe('Forms Pages Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should visit the forms page', () => {
        FormsPage.visitForm();
    })

    it('should visit the practice form page', () => {
        FormsPage.visitForm();
        FormsPage.visitPracticeForm();
    })
})