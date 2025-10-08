describe('List Page', () => {

  beforeEach(() => {
    cy.intercept('GET', '**/api/auth/session', {
      statusCode: 200,
      body: { isAuthenticated: true, user: { username: 'demo' } },
    }).as('mockSession');

    cy.intercept('GET', '**/api/books', {
      statusCode: 200,
      body: [
        {
          id: 1,
          name: 'A Game of Thrones',
          authors: ['George R. R. Martin'],
          released: '1996-08-06T00:00:00Z',
          url: 'https://anapioficeandfire.com/api/books/1'
        },
        {
          id: 2,
          name: 'A Clash of Kings',
          authors: ['George R. R. Martin'],
          released: '1998-11-16T00:00:00Z',
          url: 'https://anapioficeandfire.com/api/books/2'
        }
      ],
    }).as('mockBooks');

    cy.visit('/');
    cy.wait('@mockSession');
    cy.wait('@mockBooks');

  });

  it('should show the list of books', () => {
    cy.contains('A Game of Thrones').should('exist');
    cy.contains('A Clash of Kings').should('exist');
  });

  it('should add a book to favorites', () => {
    cy.get('.book-card').first().within(() => {
      cy.get('.favorite-icon').click({ force: true });
    });
    cy.contains(/added to favorites/i, { timeout: 6000 }).should('be.visible');
  });

  it('should remove a book from favorites', () => {
    cy.get('.book-card').first().within(() => {
      cy.get('.favorite-icon').click({ force: true });
      cy.wait(500);
      cy.get('.favorite-icon').click({ force: true });
    });
    cy.contains(/removed from favorites/i, { timeout: 6000 }).should('be.visible');
  });

  it('should filter books by search term', () => {
    cy.get('input[placeholder="Search by title"]').type('Clash');
    cy.contains('A Clash of Kings').should('exist');
    cy.contains('A Game of Thrones').should('not.exist');
  });

  it('should clear search when clicking the clear button', () => {
    cy.get('input[placeholder="Search by title"]').type('Game');
    cy.get('button[aria-label="Clear"]').click();
    cy.get('input[placeholder="Search by title"]').should('have.value', '');
    cy.contains('A Game of Thrones').should('exist');
    cy.contains('A Clash of Kings').should('exist');
  });

  it('should show "No data found" when search yields no results', () => {
    cy.get('input[placeholder="Search by title"]').type('xyz');
    cy.contains('No data found').should('be.visible');
  });

  it('should navigate to book detail when card is clicked', () => {
    cy.get('.book-card').first().click('center', { force: true });
    cy.url({ timeout: 6000 }).should('include', '/detail/1');
  });

});
