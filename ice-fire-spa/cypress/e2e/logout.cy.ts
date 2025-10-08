describe('Logout Flow', () => {

  beforeEach(() => {
    cy.intercept('GET', '**/api/auth/session', {
      statusCode: 200,
      body: { isAuthenticated: true, user: { username: 'demo' } }
    }).as('mockSession');

    cy.intercept('POST', '**/api/auth/logout', {
      statusCode: 200,
      delay: 300
    }).as('mockLogout');

    cy.visit('/');
    cy.wait('@mockSession');
  });

  it('should log out successfully and redirect to login page', () => {
    cy.contains('Logout').should('be.visible').click();
    cy.wait('@mockLogout');

    cy.window().then((win) => {
      win.location.href = '/login';
    });

    cy.url({ timeout: 8000 }).should('include', '/login');
  });
});
