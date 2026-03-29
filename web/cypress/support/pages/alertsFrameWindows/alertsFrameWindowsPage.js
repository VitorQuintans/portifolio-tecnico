import alertsFrameWindowsElements from "./alertsFrameWindowsElements"

class AlertsFramesWindowPage {
    visitAlertsFramesWindow() {
        cy.get(alertsFrameWindowsElements.alertsFrameWindowsCard, { timeout: 3000 }).should('be.visible').click()
        cy.location('href').should('include', '/alertsWindows');
    }

    selectBrowserWindows() {
        cy.get(alertsFrameWindowsElements.browserWindowsOption, { timeout: 3000 }).should('be.visible').click()
        cy.location('href').should('include', '/browser-windows');
        cy.get(alertsFrameWindowsElements.titleBrowserWindows, { timeout: 3000 }).should('be.visible').and('have.text', 'Browser Windows');
    }

}


export default new AlertsFramesWindowPage()