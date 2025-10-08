/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  cy.intercept('GET', '**/api/auth/session', {
    statusCode: 200,
    body: { isAuthenticated: true, user: { username: 'demo' } },
  }).as('mockSession');

  cy.visit('/');
  cy.wait('@mockSession');
});

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
  }
}
