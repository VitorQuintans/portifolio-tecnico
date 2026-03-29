import formsElements from "./formsElements"
import { faker } from '@faker-js/faker'
import Functions from "../../../utils/functions";

class FormsPage {
    // Variable to store the generated data between methods
    dataUsedOnPracticeForm = {}

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
        // 1. Mapping for state and city
        const locationMap = {
            'NCR': ['Delhi', 'Gurgaon', 'Noida'],
            'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
            'Haryana': ['Karnal', 'Panipat'],
            'Rajasthan': ['Jaipur', 'Jaiselmer']
        };
        const randomState = faker.helpers.arrayElement(Object.keys(locationMap))

        // 2. Generating and storing random data directly into the class instance (this.dataUsedOnPracticeForm)
        this.dataUsedOnPracticeForm = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            mobile: faker.string.numeric(10),
            address: faker.location.streetAddress(),
            dateOfBirth: Functions.getRandomDate(),
            fileExample: 'cypress/utils/files/example.txt',
            subjects: faker.helpers.arrayElement(['Maths', 'Physics', 'Chemistry', 'Computer Science', 'Commerce', 'Accounting', 'Economics', 'Arts', 'Social Studies', 'History', 'Civics', 'English', 'Hindi', 'Biology']),
            hobbies: faker.helpers.arrayElement([formsElements.hobbiesCheckboxSports, formsElements.hobbiesCheckboxReading, formsElements.hobbiesCheckboxMusic]),
            gender: faker.helpers.arrayElement([formsElements.genderMaleRadioBtn, formsElements.genderFemaleRadioBtn, formsElements.genderOtherRadioBtn]),
            stateSelect: randomState,
            citySelect: faker.helpers.arrayElement(locationMap[randomState])
        }
        // Email should be created using the first and last name generated
        this.dataUsedOnPracticeForm.email = faker.internet.email({ firstName: this.dataUsedOnPracticeForm.firstName, lastName: this.dataUsedOnPracticeForm.lastName })

        // 3. Passing these variables to the ".type()" commands
        cy.get(formsElements.firstNameInput, { timeout: 3000 }).should('be.visible').type(this.dataUsedOnPracticeForm.firstName)
        cy.get(formsElements.lastNameInput, { timeout: 3000 }).should('be.visible').type(this.dataUsedOnPracticeForm.lastName)
        cy.get(formsElements.emailInput, { timeout: 3000 }).should('be.visible').type(this.dataUsedOnPracticeForm.email)
        cy.get(this.dataUsedOnPracticeForm.gender, { timeout: 3000 }).check({ force: true })
        cy.get(formsElements.mobileInput, { timeout: 3000 }).should('be.visible').type(this.dataUsedOnPracticeForm.mobile)
        cy.get(formsElements.dateOfBirthInput, { timeout: 3000 }).should('be.visible').type('{selectall}' + this.dataUsedOnPracticeForm.dateOfBirth + '{enter}')
        cy.get(formsElements.subjectsInput, { timeout: 3000 }).should('be.visible').type(this.dataUsedOnPracticeForm.subjects + '{enter}')
        cy.get(this.dataUsedOnPracticeForm.hobbies, { timeout: 3000 }).check({ force: true })
        cy.get(formsElements.uploadPictureBtn, { timeout: 3000 }).should('be.visible').selectFile(this.dataUsedOnPracticeForm.fileExample)
        cy.get(formsElements.currentAddressInput, { timeout: 3000 }).should('be.visible').type(this.dataUsedOnPracticeForm.address)
        cy.get(formsElements.stateSelect, { timeout: 3000 }).should('be.visible').type(this.dataUsedOnPracticeForm.stateSelect + '{enter}')
        cy.get(formsElements.citySelect, { timeout: 3000 }).should('be.visible').type(this.dataUsedOnPracticeForm.citySelect + '{enter}')
        cy.get(formsElements.submitBtn, { timeout: 3000 }).should('be.visible').click()
    }

    validatePracticeForm() {
        cy.get(formsElements.modalThanksSubmitTitle, { timeout: 3000 }).should('be.visible').and('have.text', 'Thanks for submitting the form')

        // Checking if data is correct in the table using this.dataUsedOnPracticeForm
        cy.contains('tbody tr td', 'Student Name').next().should('have.text', `${this.dataUsedOnPracticeForm.firstName} ${this.dataUsedOnPracticeForm.lastName}`)
        cy.contains('tbody tr td', 'Student Email').next().should('have.text', this.dataUsedOnPracticeForm.email)
        cy.contains('tbody tr td', 'Mobile').next().should('have.text', this.dataUsedOnPracticeForm.mobile)
        cy.contains('tbody tr td', 'Subjects').next().should('have.text', this.dataUsedOnPracticeForm.subjects)
        cy.contains('tbody tr td', 'Address').next().should('have.text', this.dataUsedOnPracticeForm.address)
        cy.contains('tbody tr td', 'State and City').next().should('have.text', `${this.dataUsedOnPracticeForm.stateSelect} ${this.dataUsedOnPracticeForm.citySelect}`)
        cy.contains('tbody tr td', 'Picture').next().should('include.text', 'example.txt')


        // It was observed the 'Close' button is not closeing the thanks modal, so I'm using the 'Escape' key to close it
        // If the 'Close' buttton was working i would use:
        //cy.get(formsElements.modalThanksCloseBtn, { timeout: 3000 }).should('be.visible').click()
        cy.get('body').type('{esc}')
        cy.get(formsElements.modalThanksSubmitTitle, { timeout: 3000 }).should('not.exist')
    }
}


export default new FormsPage()