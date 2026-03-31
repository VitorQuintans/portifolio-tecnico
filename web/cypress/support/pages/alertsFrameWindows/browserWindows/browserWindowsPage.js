import browserWindowsElements from "./browserWindowsElements"

class BrowserWindowsPage {

    selectBrowserWindows() {
        cy.get(browserWindowsElements.browserWindowsOption, { timeout: 3000 }).should('be.visible').click()
    }

    checkBrowserWindowsPage() {
        cy.location('href').should('include', '/browser-windows');
        cy.get(browserWindowsElements.titleBrowserWindows, { timeout: 3000 }).should('be.visible').and('have.text', 'Browser Windows');
    }

    clickNewWindowBtn() {
        cy.window().then((win) => {
            cy.stub(win, 'open').callsFake((url) => {
                win.location.href = url;
            }).as('windowOpen')
        })
        cy.get(browserWindowsElements.newWindowBtn, { timeout: 3000 }).should('be.visible')
            .and('have.text', 'New Window')
            .click()
    }
    validateNewWindow() {
        cy.get('@windowOpen').should('be.called');
        cy.get(browserWindowsElements.samplePageText, { timeout: 3000 }).should('be.visible').and('have.text', 'This is a sample page');
    }
    closeNewWindow() {
        cy.go('back')
    }
}

export default new BrowserWindowsPage()