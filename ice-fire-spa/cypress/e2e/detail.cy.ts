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

  it('should navigate to detail page when a book card is clicked', () => {
    cy.visit('/');
    cy.wait('@mockSession');
    cy.wait('@mockBooks');

    cy.get('.book-card').first().click();

    cy.url().should('include', '/detail');
  });

  it('should display correct book details', () => {
    // Мокваме конкретна книга
    cy.intercept('GET', '**/api/books/1', {
      statusCode: 200,
      body: {
        name: 'A Game of Thrones',
        authors: ['George R. R. Martin'],
        publisher: 'Bantam Books',
        country: 'United States',
        numberOfPages: 694,
        released: '1996-08-06T00:00:00',
        isbn: '978-0553103540'
      }
    }).as('mockBookDetail');

    cy.visit('/detail/1');
    cy.wait('@mockBookDetail');

    cy.contains('A Game of Thrones').should('be.visible');
    cy.contains('George R. R. Martin').should('be.visible');
    cy.contains('Bantam Books').should('be.visible');
    cy.contains('United States').should('be.visible');
    cy.contains('694').should('be.visible');
    cy.contains('978-0553103540').should('be.visible');
  });

  it('should show error message if book fails to load', () => {
    cy.intercept('GET', '**/api/books/999', { statusCode: 404 }).as('mockError');

    cy.visit('/detail/999');
    cy.wait('@mockError');

    cy.get('body', { timeout: 10000 })
      .should('contain.text', 'Error loading book');
  });


});
