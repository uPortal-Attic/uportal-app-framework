describe('The Home Page', function() {
/* eslint-disable no-undef */
  it('successfully loads', function() {
    cy.visit('/'); // eslint would have flagged cy as undef
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
/* eslint-enable no-undef */
