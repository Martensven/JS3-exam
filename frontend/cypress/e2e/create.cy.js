describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/JS3-exam/");
    cy.get(".recipeBtn").click();
    cy.get(".createRecipeBtn").click();
    cy.get("#titleLabel").type("Pinocchio Tårta");
    cy.get("#decsriptionLabel").type(
      "Härlig sommartårta som smakar som en god vaniljglass i tårtform, innehåller färska söta jordgubbar. Smakar alltid bättre under fina sommardagar"
    );
    cy.get("input[type=file]").selectFile(
      "cypress\\fixtures\\drommig-marangtarta_11221.avif"
    );
    cy.contains("li", "Efterrätt").find('input[type="checkbox"]').check();
    cy.get("#timeToCook").type("90");
    cy.get("#setPortions").type("10");
    cy.get("#ingredientInput").type("Ägg");
    cy.get("#addBtn").click();
    cy.get("#ingredientInput").type("Grädde");
    cy.get("#addBtn").click();
    cy.get("#ingredientInput").type("Mjöl");
    cy.get("#addBtn").click();
    cy.get("#ingredientInput").type("Vaniljsocker");
    cy.get("#addBtn").click();
    cy.get("#ingredientInput").type("Jordgubbar");
    cy.get("#addBtn").click();
    cy.get("#ingredientInput").type("Vaniljkräm");
    cy.get("#addBtn").click();
    cy.get("#ingredientInput").type("Florsocker");
    cy.get("#addBtn").click();
    cy.get("#ingredientInput").type("Smör");
    cy.get("#addBtn").click();
    cy.get("#ingredientInput").type("Lakris");
    cy.get("#addBtn").click();

    cy.get("#addDoThisBtn").click();
    cy.get("#doThisInput").type("Gör en tårtbotten som täcker hela plåten");
    cy.get("#addDoThisBtn").click();
    cy.get("#doThisInput").type(
      "Häll ut smeten på plåten, häll sedan på marängsmeten ovanpå. Skiva upp några av jordgubbarna och lägg på marängsmeten. Gör om en gång till förutom att lägga på jordgubbarna sista vändan och sedan in i ugnen."
    );
    cy.get("#addDoThisBtn").click();
    cy.get("#doThisInput").type(
      "Grädda i ugnen i cirka 30 min. Taut och låt svalna. MVispa grädde och ha i liter florsocker för att få en sötare smak. När tårtan har svalnat, ha på grädden över tårtans ovansida och dekorera med en massa jordgubbar. ÄT OCH NJUT"
    );
    cy.get("#addDoThisBtn").click();
    cy.get("#saveRecipeBtn").click();
  });
});
