describe('Menu Component', () => {

  beforeEach(() => {
    cy.intercept('GET', '**/api/auth/session', {
      statusCode: 200,
      body: { isAuthenticated: true, user: { username: 'demo' } }
    }).as('mockSession');

    cy.intercept('POST', '**/api/auth/logout', {
      statusCode: 200
    }).as('mockLogout');

    cy.visit('/');
    cy.wait('@mockSession');
  });

  it('should display IceFire Hub title', () => {
    cy.get('mat-toolbar').should('contain.text', 'Ice & Fire');
  });

  it('should navigate to Favorites and highlight active link', () => {
    cy.contains('Favorites').click();
    cy.url().should('include', '/favorites');
    cy.contains('Favorites').should('have.class', 'active-link');
  });

  it('should navigate back to Home and highlight active link', () => {
    cy.contains('Home').click();
    cy.url().should('include', '/');
    cy.contains('Home').should('have.class', 'active-link');
  });

  it('should log out successfully and redirect to login page', () => {
    cy.contains('Logout').should('be.visible').click();
    cy.wait('@mockLogout');
    cy.window().then((win) => win.location.href = '/login');
    cy.url({ timeout: 8000 }).should('include', '/login');
  });

});
