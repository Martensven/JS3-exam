describe('template spec', () => {
    it('passes', () => {
      cy.visit('http://localhost:5173/JS3-exam/')
      cy.get('.recipeBtn').click()
      cy.get('#cardFrukost').click()
      cy.get('#sort-select').select('lowest')
      cy.get('#sort-select').select('highest')
      cy.get('#sort-select').select('timeCookingLong')
      cy.get('#sort-select').select('timeCookingShort')
      cy.get('#sort-select').select('alfaAToZ')
      cy.get('#sort-select').select('alfaZToA')
    })
  })