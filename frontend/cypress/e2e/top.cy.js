describe('template spec', () => {
    it('passes', () => {
      cy.visit('http://localhost:5173/JS3-exam/')
      cy.get('.topRatedBtn').click();
    cy.get('.link-cards').should('exist').first().click();

});

    
    })
  