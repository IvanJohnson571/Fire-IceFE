describe('Login flow', () => {

  beforeEach(() => {
    let callCount = 0;

    cy.intercept('GET', '**/api/auth/session', (req) => {
      callCount++;
      if (callCount === 1) {
        req.reply({
          statusCode: 200,
          body: { isAuthenticated: false }
        });
      } else {
        req.reply({
          statusCode: 200,
          body: { isAuthenticated: true, user: { username: 'demo' } }
        });
      }
    }).as('session');

    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: { message: 'Login successful' }
    }).as('login');
  });

  it('should log in successfully', () => {
    cy.visit('/login');

    cy.wait('@session');
    cy.get('input[formcontrolname="username"]').should('be.visible').type('test@angular-university.io');
    cy.get('input[formcontrolname="password"]').type('test');
    cy.contains('Login').click();

    cy.wait('@login');
    cy.wait('@session');

    cy.url().should('eq', 'http://localhost:4200/');
    cy.get('mat-toolbar').should('contain.text', 'Ice & Fire');
  });

});
