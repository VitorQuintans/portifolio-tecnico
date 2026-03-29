import alertsFrameWindowsElements from "./alertsFrameWindowsElements"
class AlertsFramesWindowPage {
    visitAlertsFramesWindow() {
        cy.get(alertsFrameWindowsElements.alertsFrameWindowsCard, { timeout: 3000 }).should('be.visible').click()
        cy.location('href').should('include', '/alertsWindows');
    }
    selectBrowserWindows() {
        cy.get(alertsFrameWindowsElements.browserWindowsOption, { timeout: 3000 }).should('be.visible').click()
    }

    checkBrowserWindowsPage() {
        cy.location('href').should('include', '/browser-windows');
        cy.get(alertsFrameWindowsElements.titleBrowserWindows, { timeout: 3000 }).should('be.visible').and('have.text', 'Browser Windows');
    }

    clickNewWindowBtn() {
        cy.window().then((win) => {
            cy.stub(win, 'open').callsFake((url) => {
                win.location.href = url;
            }).as('windowOpen')
        })
        cy.get(alertsFrameWindowsElements.newWindowBtn, { timeout: 3000 }).should('be.visible')
            .and('have.text', 'New Window')
            .click()
    }
    validateNewWindow() {
        cy.get('@windowOpen').should('be.called');
        cy.get(alertsFrameWindowsElements.samplePageText, { timeout: 3000 }).should('be.visible').and('have.text', 'This is a sample page');
    }
    closeNewWindow() {
        cy.go('back')
    }
}
export default new AlertsFramesWindowPage()