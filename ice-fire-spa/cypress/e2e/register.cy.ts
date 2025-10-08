
describe('Register flow', () => {

  it('should register a new user successfully', () => {
    cy.visit('/login');

    cy.contains('Register').click();

    cy.get('input[formcontrolname="username"]').type('newuser');
    cy.get('input[formcontrolname="password"]').type('newpassword');

    cy.intercept('POST', '**/api/auth/register', {
      statusCode: 200,
      body: { message: 'Registration successful' }
    }).as('registerUser');

    cy.contains('Register').click();

    cy.wait('@registerUser').its('response.statusCode').should('eq', 200);

    cy.contains('Login').should('exist');
  });
});
