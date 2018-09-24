const VISIT_URL = "/qrcode";

describe("/qrcode", () => {
  it("direct load of /qrcode page should show Qrcode ", () => {
    cy.visit(VISIT_URL);
    cy.url().should("match", new RegExp("/qrcode"));
    cy.getByTestId("qrcode-standalone").should("be.visible");
  });
  it("back Home link should work from QrCode page", () => {
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
      .getByTestId("link-to-qrcode")
      .click();
    cy.url().should("match", new RegExp("/qrcode$"));
  });
});
