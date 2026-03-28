import formsElements from "./formsElements"
import { faker } from '@faker-js/faker'

class FormsPage {
    visitForm() {
        cy.get(formsElements.formsCard, { timeout: 3000 }).should('be.visible').click()
        cy.location('href').should('include', '/forms');
    }

    visitPracticeForm() {
        cy.get(formsElements.practiceFormBtn, { timeout: 3000 }).should('be.visible').click()
        cy.location('href').should('include', '/automation-practice-form')
        cy.get(formsElements.practiceForm, { timeout: 1000 })
            .should('be.visible')
            .and('have.text', 'Practice Form')
    }

    fillPracticeForm() {
        cy.get(formsElements.firstNameInput, { timeout: 3000 }).should('be.visible').type()
        cy.get(formsElements.lastNameInput, { timeout: 3000 }).should('be.visible').type()
        cy.get(formsElements.emailInput, { timeout: 3000 }).should('be.visible').type()
        cy.get(formsElements.genderRadioBtn, { timeout: 3000 }).should('be.visible').click()
        cy.get(formsElements.mobileInput, { timeout: 3000 }).should('be.visible').type('')
        cy.get(formsElements.dateOfBirthInput, { timeout: 3000 }).should('be.visible').type()
        cy.get(formsElements.subjectsInput, { timeout: 3000 }).should('be.visible').type()
        cy.get(formsElements.hobbiesCheckbox, { timeout: 3000 }).should('be.visible').click()
        cy.get(formsElements.uploadPictureBtn, { timeout: 3000 }).should('be.visible').click()
        cy.get(formsElements.currentAddressInput, { timeout: 3000 }).should('be.visible').type()
        cy.get(formsElements.stateSelect, { timeout: 3000 }).should('be.visible').click()
        cy.get(formsElements.citySelect, { timeout: 3000 }).should('be.visible').click()
        cy.get(formsElements.submitBtn, { timeout: 3000 }).should('be.visible').click()
    }
}


export default new FormsPage()