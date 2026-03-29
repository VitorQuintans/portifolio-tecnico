import AlertsFrameWindowsPage from '../../support/pages/alertsFrameWindows/alertsFrameWindowsPage'

// Prevents Cypress from failing the test if external scripts/website ads return an error.
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Alerts Frame Windows Pages Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    context('Successful scenarios and Acceptance Criteria', () => {
        context('Essential scenarios', () => {
            it('should visit the alerts frame windows page', () => {
                AlertsFrameWindowsPage.visitAlertsFramesWindow();
            })
            it.only('should select "Browser Windows" option', () => {
                AlertsFrameWindowsPage.visitAlertsFramesWindow();
                AlertsFrameWindowsPage.selectBrowserWindows();
            })
        })

        context('Interactive scenarios with forms', () => {
        })
    })
})
