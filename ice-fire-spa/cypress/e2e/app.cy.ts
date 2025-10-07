describe('Login flow', () => {
  it('should log in successfully', () => {
    cy.visit('/login');

    cy.get('input[formcontrolname="username"]').type('test@angular-university.io');
    cy.get('input[formcontrolname="password"]').type('test');

    cy.contains('Login').click();

    cy.url().should('eq', 'http://localhost:4200/');
    cy.get('mat-toolbar').should('contain.text', 'IceFire Hub');
  });
});
