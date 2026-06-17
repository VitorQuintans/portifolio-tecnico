import WebTablesElements from "./webTablesElements";
import Functions from "../../../../utils/functions";

class WebTablesPage {
    // ==========================================
    // Access and Navigation Functions
    // ==========================================

    accessWebTablesPage() {
        cy.get(WebTablesElements.webTablesBtn).should('be.visible')
            .and('have.text', 'Web Tables')
            .click();
    }

    validateWebTablesPage() {
        cy.url().should('include', '/webtables');
        cy.get('h1').should('have.text', 'Web Tables');
    }

    // ==========================================
    // Business Actions (CRUD)
    // ==========================================

    creatingNewRecord() {
        this.currentRecord = Functions.generateRandomUser();

        cy.get(WebTablesElements.addNewRecordBtn).should('be.visible')
            .and('have.text', 'Add')
            .click({ force: true });

        this._fillRegistrationForm(this.currentRecord);
    }

    updateRecordOnWebTables() {
        const oldEmail = this.currentRecord.email;
        this.currentRecord = Functions.generateRandomUser(); // Generate new data mass updated

        cy.get(`${WebTablesElements.recordsTable} tbody tr`)
            .contains('td', oldEmail)
            .parent()
            .find('[title="Edit"]')
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true }); // Overcome ads on DemoQA

        this._fillRegistrationForm(this.currentRecord);
    }

    deleteRecordOnWebTables() {
        const oldEmail = this.currentRecord.email;

        cy.get(`${WebTablesElements.recordsTable} tbody tr`)
            .contains('td', oldEmail)
            .parent()
            .find('[title="Delete"]')
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true }); // Overcome ads on DemoQA
    }

    // ==========================================
    // Validations
    // ==========================================

    validateDataUserOnWebTables() {
        this._validateRecordData(this.currentRecord);
    }

    validateRecordDeletedOnWebTables() {
        const email = this.currentRecord.email;
        // Check if the email just deleted does not exist in the table
        cy.get(`${WebTablesElements.recordsTable} tbody tr`)
            .contains('td', email)
            .should('not.exist');
    }

    submitEmptyForm() {
        cy.get(WebTablesElements.addNewRecordBtn).should('be.visible')
            .and('have.text', 'Add')
            .click({ force: true });

        cy.get(WebTablesElements.submitBtn).should('be.visible')
            .and('have.text', 'Submit')
            .click();
    }

    validateFormValidationFeedback() {
        // Bootstrap adds the 'was-validated' class to the form upon invalid submit
        cy.get('#userForm').should('have.class', 'was-validated');
        
        // Assert that the mandatory fields are marked as invalid using HTML5 validation properties
        cy.get(WebTablesElements.firstNameInput).then(($el) => {
            expect($el[0].checkValidity()).to.be.false;
        });
        cy.get(WebTablesElements.lastNameInput).then(($el) => {
            expect($el[0].checkValidity()).to.be.false;
        });
        cy.get(WebTablesElements.emailInput).then(($el) => {
            expect($el[0].checkValidity()).to.be.false;
        });
        
        // Close the modal
        cy.get(WebTablesElements.closeBtn).click({ force: true });
    }

    submitInvalidEmail(invalidEmail) {
        cy.get(WebTablesElements.addNewRecordBtn).should('be.visible')
            .and('have.text', 'Add')
            .click({ force: true });

        // Generate dynamic valid user data first, then override the email with an invalid one
        const data = Functions.generateRandomUser();
        data.email = invalidEmail;

        cy.get(WebTablesElements.firstNameInput).type(data.firstName);
        cy.get(WebTablesElements.lastNameInput).type(data.lastName);
        cy.get(WebTablesElements.emailInput).type(data.email);
        cy.get(WebTablesElements.ageInput).type(String(data.age));
        cy.get(WebTablesElements.salaryInput).type(String(data.salary));
        cy.get(WebTablesElements.departmentInput).type(data.department);

        cy.get(WebTablesElements.submitBtn).click();
    }

    validateEmailInvalidFeedback() {
        // Form is marked as validated but has invalid fields
        cy.get('#userForm').should('have.class', 'was-validated');
        
        // Email input is invalid
        cy.get(WebTablesElements.emailInput).then(($el) => {
            expect($el[0].checkValidity()).to.be.false;
        });
        
        // Close the modal
        cy.get(WebTablesElements.closeBtn).click({ force: true });
    }

    // ==========================================
    // Private Helpers
    // ==========================================

    _fillRegistrationForm(data) {
        cy.get(WebTablesElements.firstNameInput).should('be.visible')
            .and('have.attr', 'placeholder', 'First Name').clear().type(data.firstName);

        cy.get(WebTablesElements.lastNameInput).should('be.visible')
            .and('have.attr', 'placeholder', 'Last Name').clear().type(data.lastName);

        cy.get(WebTablesElements.emailInput).should('be.visible')
            .and('have.attr', 'placeholder', 'name@example.com').clear().type(data.email);

        cy.get(WebTablesElements.ageInput).should('be.visible')
            .and('have.attr', 'placeholder', 'Age').clear().type(String(data.age));

        cy.get(WebTablesElements.salaryInput).should('be.visible')
            .and('have.attr', 'placeholder', 'Salary').clear().type(String(data.salary));

        cy.get(WebTablesElements.departmentInput).should('be.visible')
            .and('have.attr', 'placeholder', 'Department').clear().type(data.department);

        cy.get(WebTablesElements.submitBtn).should('be.visible')
            .and('have.text', 'Submit').click();
    }

    _validateRecordData(data) {
        cy.get(`${WebTablesElements.recordsTable} tbody tr`)
            .contains('td', data.email)
            .parent()
            .within(() => {
                cy.get('td').eq(0).should('include.text', String(data.firstName));
                cy.get('td').eq(1).should('include.text', String(data.lastName));
                cy.get('td').eq(2).should('include.text', String(data.age));
                cy.get('td').eq(3).should('include.text', String(data.email));
                cy.get('td').eq(4).should('include.text', String(data.salary));
                cy.get('td').eq(5).should('include.text', String(data.department));
            });
    }
}

export default new WebTablesPage();