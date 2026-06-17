import FormsPage from '../../support/pages/forms/formsPage'
import PracticeFormPage from '../../support/pages/forms/practiceForm/practiceFormPage'

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
                PracticeFormPage.visitPracticeForm();
            })
        })

        context('Interactive scenarios with forms', () => {
            it('should fill the practice form with faker data', () => {
                FormsPage.visitForm();
                PracticeFormPage.visitPracticeForm();
                PracticeFormPage.fillPracticeForm();
            })

            it('should validate the practice form if is filled correctly', () => {
                FormsPage.visitForm();
                PracticeFormPage.visitPracticeForm();
                PracticeFormPage.fillPracticeForm();
                PracticeFormPage.validatePracticeForm();
            })
        })
    })
})