// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('removeAds', () => {
    // Hide Google Ads and other elements that block layout/clicks on DemoQA
    cy.get('body').then(($body) => {
        if ($body.find('iframe[id^="google_ads_iframe"]').length > 0) {
            cy.get('iframe[id^="google_ads_iframe"]').each(($el) => {
                cy.wrap($el).parent().parent().invoke('remove');
            });
        }
        if ($body.find('#adplus-anchor').length > 0) {
            cy.get('#adplus-anchor').invoke('remove');
        }
        if ($body.find('footer').length > 0) {
            cy.get('footer').invoke('remove');
        }
        if ($body.find('#close-fixedban').length > 0) {
            cy.get('#close-fixedban').click({ force: true });
        }
    });
});