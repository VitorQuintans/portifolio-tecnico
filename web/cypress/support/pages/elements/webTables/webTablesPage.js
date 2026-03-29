import WebTablesElements from "./webTablesElements";
import { faker } from "@faker-js/faker";

class WebTablesPage {
    accessWebTablesPage() {
        cy.get(WebTablesElements.webTablesBtn).should('be.visible')
            .and('have.text', 'Web Tables')
            .click();
    }

    validateWebTablesPage() {
        cy.url().should('include', '/webtables');
        cy.get('h1').should('have.text', 'Web Tables');
    }

    creatingNewRecord() {
        this.dataUsedOnWebTables = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 65 }),
            salary: faker.number.int({ min: 10000, max: 100000 }),
            department: faker.helpers.arrayElement(['IT', 'HR', 'Admin', 'Sales', 'Marketing'])
        };


        cy.get(WebTablesElements.addNewRecordBtn).should('be.visible')
            .and('have.text', 'Add')
            .click();
        cy.get(WebTablesElements.firstNameInput).should('be.visible')
            .and('have.attr', 'placeholder', 'First Name')
            .type(this.dataUsedOnWebTables.firstName);
        cy.get(WebTablesElements.lastNameInput).should('be.visible')
            .and('have.attr', 'placeholder', 'Last Name')
            .type(this.dataUsedOnWebTables.lastName);
        cy.get(WebTablesElements.emailInput).should('be.visible')
            .and('have.attr', 'placeholder', 'name@example.com')
            .type(this.dataUsedOnWebTables.email);
        cy.get(WebTablesElements.ageInput).should('be.visible')
            .and('have.attr', 'placeholder', 'Age')
            .type(this.dataUsedOnWebTables.age);
        cy.get(WebTablesElements.salaryInput).should('be.visible')
            .and('have.attr', 'placeholder', 'Salary')
            .type(this.dataUsedOnWebTables.salary);
        cy.get(WebTablesElements.departmentInput).should('be.visible')
            .and('have.attr', 'placeholder', 'Department')
            .type(this.dataUsedOnWebTables.department);
        cy.get(WebTablesElements.submitBtn).should('be.visible')
            .and('have.text', 'Submit')
            .click();
    }

    validateUserCreatedOnWebTables() {
        // Filtra todas as linhas da tabela até encontrar uma que tenha TODAS as colunas correspondentes
        cy.get(`${WebTablesElements.recordsTable} tbody tr`).filter((index, el) => {
            const tds = Cypress.$(el).find('td');
            if (tds.length < 6) return false;

            return tds.eq(0).text() === this.dataUsedOnWebTables.firstName &&
                tds.eq(1).text() === this.dataUsedOnWebTables.lastName &&
                tds.eq(2).text() === this.dataUsedOnWebTables.age.toString() &&
                tds.eq(3).text() === this.dataUsedOnWebTables.email &&
                tds.eq(4).text() === this.dataUsedOnWebTables.salary.toString() &&
                tds.eq(5).text() === this.dataUsedOnWebTables.department;
        })
            .should('have.length.at.least', 1)
            .first()
            .should('be.visible');
    }
}

export default new WebTablesPage();