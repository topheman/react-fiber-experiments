describe("Home", () => {
  beforeEach(() => {
    // make sure to start from a blank page for each test
    cy.visit("/");
  });
  it("should load Home page", () => {
    cy.contains("react-fiber-experiments").should("have.prop", "title", "Home");
  });
});
