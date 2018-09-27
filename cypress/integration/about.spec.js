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
  // Skipping on Travis, doesn't recognize "node" - https://travis-ci.org/topheman/react-fiber-experiments/builds/433978705#L565
  (isTravisCi => (isTravisCi ? describe.skip : describe))(
    JSON.parse(Cypress.env("TRAVIS") || false)
  )("React custom build section", () => {
    let retrievedReactModulesInfos;
    before(() => {
      // calling react-modules-infos from command line (must happen in node, not in browser)
      // we can rely on this - it is unit tested
      cy.exec(
        `node -e "process.stdout.write(JSON.stringify(require('./src/scripts/react-modules-infos')())); ; process.exit(0);"`,
        { failOnNonZeroExit: false } // on Travis CI, it exits with code 127 - https://travis-ci.org/topheman/react-fiber-experiments/builds/433974746#L565
      ).then(({ stdout, stderr, code }) => {
        if (stderr) {
          throw new Error(stderr);
        }
        if (code > 0) {
          throw new Error(
            `Retrieving react-modules-infos exited with code ${code}`
          );
        }
        try {
          retrievedReactModulesInfos = JSON.parse(stdout);
        } catch (e) {
          throw new Error(
            `Error parsing stdout of react-modules-infos: ${stdout}`
          );
        }
      });
    });
    it("modules should have correct version and description", () => {
      Object.entries(retrievedReactModulesInfos).forEach(
        ([name, { version, description }]) => {
          cy.getByText(name).should("exist");
          cy.getByText(version).should("exist");
          cy.getByText(description).should("exist");
        }
      );
    });
  });
});
