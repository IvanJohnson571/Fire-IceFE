describe('Favorites Page', () => {

  beforeEach(() => {

    cy.intercept('GET', '**/api/auth/session', {
      statusCode: 200,
      body: { isAuthenticated: true, user: { username: 'demo' } },
    }).as('mockSession');

    cy.intercept('GET', '**/api/books', {
      statusCode: 200,
      body: [
        {
          name: 'A Game of Thrones',
          authors: ['George R. R. Martin'],
          released: '1996-08-06T00:00:00Z',
          url: 'https://anapioficeandfire.com/api/books/1',
        },
        {
          name: 'A Clash of Kings',
          authors: ['George R. R. Martin'],
          released: '1998-11-16T00:00:00Z',
          url: 'https://anapioficeandfire.com/api/books/2',
        },
      ],
    }).as('mockBooks');

  });

  it('should display added favorite book', () => {

    cy.visit('/');
    cy.wait('@mockSession');
    cy.wait('@mockBooks');
    cy.contains('A Game of Thrones', { timeout: 8000 }).should('exist');
    cy.get('.book-card').first().find('.favorite-icon').click();
    cy.get('body', { timeout: 10000 })
      .should('contain.text', 'Added to favorites successfully');
    cy.visit('/favorites');
    cy.contains('A Game of Thrones').should('exist');

  });

  it('should remove a book from favorites', () => {

    cy.visit('/');
    cy.wait('@mockSession');
    cy.wait('@mockBooks');
    cy.get('.book-card').first().find('.favorite-icon').click();
    cy.get('body', { timeout: 10000 })
      .should('contain.text', 'Added to favorites successfully');
    cy.visit('/favorites');
    cy.get('.book-card').first().find('.favorite-icon').click();
    cy.get('body', { timeout: 10000 })
      .should('contain.text', 'Removed from favorites successfully');
    cy.contains('No favorites selected').should('be.visible');

  });

  it('should show message when no favorites exist', () => {

    cy.intercept('GET', '**/api/auth/session', {
      statusCode: 200,
      body: { isAuthenticated: true, user: { username: 'demo' } },
    }).as('emptySession');
    cy.visit('/favorites');
    cy.wait('@emptySession');
    cy.contains('No favorites selected').should('be.visible');
  });

});
