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
            it('should select "Browser Windows" option', () => {
                AlertsFrameWindowsPage.visitAlertsFramesWindow();
                AlertsFrameWindowsPage.selectBrowserWindows();
            })


        })
        context('Clicking on "New Windows" button', () => {
            it('should open a new window and display the text "This is a sample page" and close it', () => {
                AlertsFrameWindowsPage.visitAlertsFramesWindow();
                AlertsFrameWindowsPage.selectBrowserWindows();
                AlertsFrameWindowsPage.checkBrowserWindowsPage();
                AlertsFrameWindowsPage.clickNewWindowBtn();
                AlertsFrameWindowsPage.validateNewWindow();
                AlertsFrameWindowsPage.closeNewWindow();
                AlertsFrameWindowsPage.checkBrowserWindowsPage();
            })
        })
    })
})
