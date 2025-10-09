describe('Register flow', () => {

  it('should register a new user successfully', () => {

    cy.intercept('GET', '**/api/auth/session', {
      statusCode: 200,
      body: { isAuthenticated: false }
    }).as('noSession');

    cy.visit('/login');
    cy.wait('@noSession');

    cy.get('input[formcontrolname="username"]').should('be.visible');

    cy.get('a').contains('Register').click();

    cy.get('input[formcontrolname="username"]').type('newuser');
    cy.get('input[formcontrolname="password"]').type('newpassword');

    cy.intercept('POST', '**/api/auth/register', {
      statusCode: 200,
      body: { message: 'Registration successful' }
    }).as('registerUser');

    cy.get('button.login-btn').contains('Register').click();

    cy.wait('@registerUser').its('response.statusCode').should('eq', 200);

    cy.get('h2').should('contain.text', 'Log in');
    cy.contains('Login').should('exist');
  });

});
