import alertsFrameWindowsElements from "./alertsFrameWindowsElements"
class AlertsFramesWindowPage {
    visitAlertsFramesWindow() {
        cy.get(alertsFrameWindowsElements.alertsFrameWindowsCard, { timeout: 3000 }).should('be.visible').click()
        cy.location('href').should('include', '/alertsWindows');
    }
}
export default new AlertsFramesWindowPage()