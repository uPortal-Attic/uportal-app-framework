describe('The Home Page', function() {
  it('successfully loads', function() {
    cy.visit('/');
  });

  it('includes the portal name in the title', function() {
    cy.visit('/');
    cy.title().should('include', 'uPortal');
  });

  it('includes the app name in the title', function() {
    cy.visit('/');
    cy.title().should('include', 'Frame app');
  });
});
