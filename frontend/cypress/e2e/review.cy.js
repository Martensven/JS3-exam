// Testflöde för att skapa en recension

describe("Skapa recension", () => {
  it("lämnar en recension med betyg, namn och kommentar", () => {
    cy.visit("http://localhost:5173/JS3-exam/"); // Besök vår app/sida

    cy.get(".startBtn").click(); // Gå in på startsidan

    cy.get(".recipeBtn").click(); // Gå in på kategorisidan

    cy.get("#cardFrukost").click(); // Gå in på Frukostkategorin

    cy.get("#id-85d21bd5-26e6-4635-87e0-002bcaf02de6").click(); // Gå in på specifikt recept

    cy.get("#cyp-review-open-form-button").click(); // Öppna recensionsformuläret

    cy.get("#cyp-review-star-3").click(); // Klicka på tredje stjärnan i betygsfältet

    cy.get("#cyp-review-input").type("Cypress-Testare"); // Fyll i namn

    cy.get("#cyp-review-textarea").type(
      "Detta är en testrecension via Cypress"
    ); // Fyll i kommentar

    cy.get("#cyp-review-submit-button").click(); // Skicka recensionen

    cy.contains("Tack för din recension!").should("be.visible"); // Verifiera att "success"-meddelandet dyker upp
  });
});
