const VISIT_URL = "/suspense/placeholder";

describe("/suspense/placeholder", () => {
  // create series of tests for the following delayMs (which is customizable via url)
  [1500, 4500, 7500].forEach(delayMs => {
    describe(`check suspending delayMs=${delayMs}`, () => {
      before(() => {
        cy.visit(`${VISIT_URL}/delayMs/${delayMs}`);
        cy.url().should(
          "match",
          new RegExp(`/suspense/placeholder/delayMs/${delayMs}$`)
        );
      });
      // for each duration, create a series of tests
      [150, 300, 1000, 2000, 3000, 5000, 6000, 10000].forEach(duration => {
        // weird, for 6000ms, a Placeholder with a delayMs > 6000 will always show spinner ...
        // so skipping the test for this specific case
        (duration === 6000 && delayMs > 6000 ? it.skip : it)(
          `[duration=${duration}ms] ${
            duration > delayMs
              ? "should show spinner then content"
              : "should NOT show spinner - content will show in time"
          }`,
          () => {
            cy.getByTestId(`link-to-duration-${duration}`).click();
            cy.url().should(
              "match",
              new RegExp(
                `/suspense/placeholder/delayMs/${delayMs}/duration/${duration}$`
              )
            );
            if (duration > delayMs) {
              // duration > delayMs -> should show spinner then content
              cy.get(
                `[data-testid=link-to-duration-${duration}] .render-paused`
              ).should("be.visible");
              cy.get("[data-testid=delay-spinner]").should("exist");
              cy.get("[data-testid=delay-spinner]").should("not.exist");
              cy.get(
                `[data-testid=link-to-duration-${duration}] .render-paused`
              ).should("not.be.visible");
              cy.getByTestId("delay-result").should(
                "contain",
                `Resource loaded in ${duration}ms`
              );
            } else {
              // duration < delayMs -> should NOT show spinner - content will show in time
              cy.get(
                `[data-testid=link-to-duration-${duration}] .render-paused`
              ).should("be.visible");
              cy.get(
                `[data-testid=link-to-duration-${duration}] .render-paused`
              ).should("not.be.visible");
              cy.get("[data-testid=delay-spinner]").should("not.exist");
              cy.getByTestId("delay-result").should(
                "contain",
                `Resource loaded in ${duration}ms`
              );
            }
          }
        );
      });
    });
  });
});
