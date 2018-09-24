const VISIT_URL = "/suspense/regular-rendering";

describe("/suspense/regular-rendering", () => {
  ["slowNetwork", "fastNetwork", "slowEndPoint"].forEach(mode => {
    describe(mode, () => {
      before(() => {
        cy.visit(VISIT_URL); // only reload at the beginning of the following "it"s
        // set correct network mode
        cy.slideNetworkSlider(mode);
        cy.url().should("match", new RegExp("/suspense/regular-rendering$"));
      });
      beforeEach(() => {
        cy.getByTestId("link-to-regular-rendering").click();
        cy.url().should("match", new RegExp("/suspense/regular-rendering$"));
      });
      it("should show blue spinner on first load", () => {
        cy.getByTestId("link-to-course-react").click();
        cy.url().should("contain", "/suspense/regular-rendering/course/react");
        cy.getByTestId("lazyload-spinner").should("be.visible");
        cy.get("[data-testid=lazyload-spinner]").should("not.exist");
      });
      it("should NOT show blue spinner on subsequent loads", () => {
        cy.getByTestId("link-to-course-nodejs").click();
        cy.url().should("contain", "/suspense/regular-rendering/course/nodejs");
        cy.get("[data-testid=lazyload-spinner]").should("not.exist");
      });
      it("should show course infos red spinner", () => {
        cy.getByTestId("link-to-course-webpack").click();
        cy.url().should(
          "contain",
          "/suspense/regular-rendering/course/webpack"
        );
        cy.getByTestId("course-infos-spinner").should("be.visible");
        cy.get("[data-testid=course-infos-spinner]").should("not.exist");
      });
      it("should show course infos result", () => {
        cy.getByTestId("link-to-course-docker").click();
        cy.url().should("contain", "/suspense/regular-rendering/course/docker");
        cy.getByTestId("course-infos").should("be.visible");
      });
      if (mode === "slowEndPoint") {
        it(`[${mode}] should show next lesson spinner`, () => {
          cy.slideNetworkSlider(mode);
          cy.getByTestId("link-to-course-react").click();
          cy.url().should(
            "contain",
            "/suspense/regular-rendering/course/react"
          );
          cy.get("[data-testid=next-lesson-spinner]").should("be.visible");
          cy.get("[data-testid=next-lesson-spinner]").should("not.exist");
        });
      }
      it(`[${mode}] should show next lesson result`, () => {
        cy.slideNetworkSlider(mode);
        cy.getByTestId("link-to-course-nodejs").click();
        cy.url().should("contain", "/suspense/regular-rendering/course/nodejs");
        cy.get("[data-testid=next-lesson]").should("be.visible");
      });
    });
  });
  describe("Error handling", () => {
    it("should show retry button when illegal courseId provided", () => {
      cy.visit(`${VISIT_URL}/course/badCourseId`);
      cy.url().should(
        "match",
        new RegExp("/suspense/regular-rendering/course/badCourseId$")
      );
      cy.get("[data-testid=course-infos-error]").should("be.visible");
    });
    it("should reload when click on retry", () => {
      cy.visit(`${VISIT_URL}/course/badCourseId`);
      cy.url().should(
        "match",
        new RegExp("/suspense/regular-rendering/course/badCourseId$")
      );
      cy.get("[data-testid=course-infos-error] button").click();
      cy.get("[data-testid=course-infos-spinner]").should("be.visible");
      cy.get("[data-testid=course-infos-spinner]").should("not.exist");
      cy.get("[data-testid=course-infos-error]").should("be.visible");
    });
  });
  describe("UI", () => {
    beforeEach(() => {
      cy.visit(VISIT_URL);
      cy.url().should("match", new RegExp("/suspense/regular-rendering$"));
    });
    it('should visit "parent folder" via relative link ".."', () => {
      cy.url().should("match", new RegExp("/suspense/regular-rendering$"));
      cy.getByTestId("link-to-suspense").click();
      cy.url().should("match", new RegExp("/suspense$"));
    });
    it("should return to this page on back button ⬅️ of course result", () => {
      cy.url().should("match", new RegExp("/suspense/regular-rendering$"));
      cy.getByTestId("link-to-course-react").click();
      cy.url().should(
        "match",
        new RegExp("/suspense/regular-rendering/course/react$")
      );
      cy.getByTestId("back-button").click();
      cy.url().should("match", new RegExp("/suspense/regular-rendering$"));
    });
    it("should reload course result when click on 🔄", () => {
      cy.url().should("match", new RegExp("/suspense/regular-rendering$"));
      cy.getByTestId("link-to-course-nodejs").click();
      cy.url().should(
        "match",
        new RegExp("/suspense/regular-rendering/course/nodejs$")
      );
      cy.getByTestId("reload-button").click();
      cy.url().should(
        "match",
        new RegExp("/suspense/regular-rendering/course/nodejs$")
      );
      cy.getByTestId("course-infos-spinner").should("be.visible");
      cy.get("[data-testid=course-infos-spinner]").should("not.exist");
    });
  });
});
