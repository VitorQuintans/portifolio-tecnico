import ProgressBarPage_ELEMENTS from "./progressBarElements";

class ProgressBarPage {
    accessProgressBarPage() {
        cy.get(ProgressBarPage_ELEMENTS.progressBarSubMenu).scrollIntoView().click({ force: true });
    }

    validateProgressBarPage() {
        cy.url().should('include', '/progress-bar');
        cy.get(ProgressBarPage_ELEMENTS.progressBarContainer).should('be.visible');
        cy.get(ProgressBarPage_ELEMENTS.progressBarTitle).should('have.text', 'Progress Bar').and('be.visible');
    }

    startProgressBar() {
        cy.get(ProgressBarPage_ELEMENTS.startStopButton).should('be.visible').click({ force: true });
    }

    stopBefore(percentage) {
        cy.get(ProgressBarPage_ELEMENTS.progressBar, { timeout: 15000 })
            .should(($el) => {
                const currentPercentage = parseInt($el.attr('aria-valuenow'), 10);
                expect(currentPercentage).to.be.at.least(percentage - 4);
            });
        cy.get(ProgressBarPage_ELEMENTS.startStopButton).click();
    }

    validateProgress(percentage) {
        cy.get(ProgressBarPage_ELEMENTS.progressBar).scrollIntoView()
            .invoke('attr', 'aria-valuenow')
            .then(parseInt)
            .should('be.lte', percentage);
    }

    startAndResetAt100() {
        cy.get(ProgressBarPage_ELEMENTS.startStopButton).click();

        cy.get(ProgressBarPage_ELEMENTS.progressBar, { timeout: 20000 })
            .should('have.attr', 'aria-valuenow', '100')


        cy.get(ProgressBarPage_ELEMENTS.resetButton).should('be.visible')
            .and('have.text', 'Reset')
            .invoke('click');

        cy.get(ProgressBarPage_ELEMENTS.progressBar)
            .should('have.attr', 'aria-valuenow', '0');
    }
}

export default new ProgressBarPage();