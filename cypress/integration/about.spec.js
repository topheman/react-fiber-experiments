const VISIT_URL = "/about";

describe("/about", () => {
  it("direct load of /about page should show About", () => {
    cy.visit(VISIT_URL);
    cy.url().should("match", new RegExp("/about$"));
    cy.getByText("About").should("be.visible");
  });
  it("back Home link should work from About page", () => {
    cy.visit(VISIT_URL);
    cy.getByText("🏠 Home").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/");
    });
  });
  it("should load /about page from MainDrawer", () => {
    cy.visit("/");
    cy.get("[aria-label=Menu]")
      .click()
      .getByTestId("link-to-about")
      .click();
    cy.url().should("match", new RegExp("/about$"));
  });
});
