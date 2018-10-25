const VISIT_URL = "/suspense/async-rendering/delayMs/350";

describe("/suspense/async-rendering", () => {
  describe("slowNetwork", () => {
    before(() => {
      cy.visit(VISIT_URL);
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)$")
      );
    });
    beforeEach(() => {
      cy.slideNetworkSlider("slowNetwork");
      cy.getByTestId("link-to-async-rendering").click();
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)$")
      );
    });
    it("should show blue spinner on first load", () => {
      // cy.getByTestId("cache-refresh-button").click();
      cy.getByTestId("link-to-course-react").click();
      cy.getByTestId("lazyload-spinner").should("be.visible");
      cy.get("[data-testid=lazyload-spinner]").should("not.exist");
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)/course/react$")
      );
    });
    it("should NOT show blue spinner on subsequent loads", () => {
      // cy.getByTestId("cache-refresh-button").click();
      cy.getByTestId("link-to-course-nodejs").click();
      cy.get("[data-testid=lazyload-spinner]").should("not.exist");
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)/course/nodejs$")
      );
    });
    it("should show course infos red spinner", () => {
      // cy.getByTestId("cache-refresh-button").click();
      cy.getByTestId("link-to-course-webpack").click();
      cy.getByTestId("course-infos-spinner").should("be.visible");
      cy.get("[data-testid=course-infos-spinner]").should("not.exist");
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)/course/webpack$")
      );
    });
    it("should show all results when loaded", () => {
      // cy.getByTestId("cache-refresh-button").click();
      cy.getByTestId("link-to-course-docker").click();
      cy.get("[data-testid=course-infos]").should("be.visible");
      cy.get("[data-testid=next-lesson]").should("be.visible");
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)/course/docker$")
      );
    });
  });
  describe("fastNetwork", () => {
    before(() => {
      cy.visit(VISIT_URL);
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)$")
      );
    });
    beforeEach(() => {
      cy.slideNetworkSlider("fastNetwork");
      cy.getByTestId("link-to-async-rendering").click();
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)$")
      );
    });
    it("should NOT show blue spinner on first load", () => {
      // cy.getByTestId("cache-refresh-button").click();
      cy.getByTestId("link-to-course-react").click();
      cy.get("[data-testid=lazyload-spinner]").should("not.exist");
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)/course/react$")
      );
    });
    it("should NOT show ANY spinner on subsequent loads", () => {
      // cy.getByTestId("cache-refresh-button").click();
      cy.getByTestId("link-to-course-nodejs").click();
      cy.get("[data-testid=lazyload-spinner]").should("not.exist");
      cy.get("[data-testid=course-infos-spinner]").should("not.exist");
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)/course/nodejs$")
      );
    });
    it("should show all results when loaded", () => {
      // cy.getByTestId("cache-refresh-button").click();
      cy.getByTestId("link-to-course-webpack").click();
      cy.get("[data-testid=course-infos]").should("be.visible");
      cy.get("[data-testid=next-lesson]").should("be.visible");
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)/course/webpack$")
      );
    });
    it("should change link's opacity when suspending", () => {
      // cy.getByTestId("cache-refresh-button").click({ force: true });
      cy.getByTestId("link-to-course-docker").click();
      cy.getByTestId("link-to-course-docker").then(el => {
        const opacity = Cypress.$(el)
          .css("opacity")
          .replace(",", "."); // .css("opacity") returns floats with comma instead of dot 🤔
        expect(opacity).to.eq("0.5");
      });
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)/course/docker$")
      );
    });
  });
  describe("slowEndPoint", () => {
    before(() => {
      cy.visit(VISIT_URL);
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)$")
      );
    });
    beforeEach(() => {
      cy.slideNetworkSlider("slowEndPoint");
      cy.getByTestId("link-to-async-rendering").click();
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)$")
      );
    });
    it("should NOT show blue spinner on first load", () => {
      // cy.getByTestId("cache-refresh-button").click();
      cy.getByTestId("link-to-course-react").click();
      cy.get("[data-testid=lazyload-spinner]").should("not.exist");
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)/course/react$")
      );
    });
    it("should ONLY show next lesson spinner", () => {
      // cy.getByTestId("cache-refresh-button").click();
      cy.getByTestId("link-to-course-nodejs").click();
      cy.get("[data-testid=course-infos-spinner]").should("not.exist");
      cy.get("[data-testid=next-lesson-spinner]").should("be.visible");
      cy.get("[data-testid=next-lesson-spinner]").should("not.exist");
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)/course/nodejs$")
      );
    });
    it("should show all results when loaded", () => {
      // cy.getByTestId("cache-refresh-button").click();
      cy.getByTestId("link-to-course-webpack").click();
      cy.get("[data-testid=course-infos]").should("be.visible");
      cy.get("[data-testid=next-lesson]").should("be.visible");
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)/course/webpack$")
      );
    });
  });
  describe("using cache", () => {
    before(() => {
      cy.visit(VISIT_URL);
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)$")
      );
      // warm up cache
      ["react", "nodejs", "webpack", "docker"].forEach((courseId, index) => {
        cy.getByTestId("link-to-async-rendering").click();
        cy.getByTestId(`link-to-course-${courseId}`).click();
        cy.url().should(
          "match",
          new RegExp(
            `/suspense/async-rendering/delayMs/(\\d+)/course/${courseId}$`
          )
        );
        cy.wait(index > 0 ? 300 : 1000); // make sure not to cancel inflight request (wouldn't be cached)
      });
    });
    beforeEach(() => {
      cy.getByTestId("link-to-async-rendering").click();
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)$")
      );
    });
    it("should load directly from the cache", () => {
      cy.slideNetworkSlider("slowEndPoint");
      cy.getByTestId("link-to-course-react").click();
      cy.get("[data-testid=course-infos-spinner]").should("not.exist");
      cy.get("[data-testid=next-lesson-spinner]").should("not.exist");
      cy.get("[data-testid=course-infos]").should("be.visible");
      cy.get("[data-testid=next-lesson]").should("be.visible");
      cy.url().should(
        "match",
        new RegExp("/suspense/async-rendering/delayMs/(\\d+)/course/react$")
      );
    });
  });
  describe("Error handling", () => {
    it("should show error message when illegal courseId provided", () => {
      cy.visit(`${VISIT_URL}/course/badCourseId`);
      cy.url().should(
        "match",
        new RegExp(
          "/suspense/async-rendering/delayMs/(\\d+)/course/badCourseId$"
        )
      );
      cy.get("[data-testid=course-infos-error]").should("be.visible");
    });
  });
});
