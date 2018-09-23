/**
 * First, we need to check that the sliders work correctly before relying on them
 *
 * cy.slideNetworkSlider and cy.slidePlaceholderSlider are declared in support/commands.shared.js
 */

describe("Sliders", () => {
  describe("Network Slider", () => {
    before(() => {
      cy.visit("/suspense/regular-rendering");
    });
    it("should update network mode to slowNetwork", () => {
      cy.slideNetworkSlider("slowNetwork")
        .getByTestId("network-slider-wrapper")
        .getByText(/slowNetwork/);
    });
    it("should update network mode to fastNetwork", () => {
      cy.slideNetworkSlider("fastNetwork")
        .getByTestId("network-slider-wrapper")
        .getByText(/fastNetwork/);
    });
    it("should update network mode to slowEndPoint", () => {
      cy.slideNetworkSlider("slowEndPoint")
        .getByTestId("network-slider-wrapper")
        .getByText(/slowEndPoint/);
    });
  });
  describe("Placeholder Slider", () => {
    before(() => {
      cy.visit("/suspense/placeholder");
    });
    [1000, 1500, 2000, 2600, 4300, 5000, 6700, 7800, 8900, 9300].forEach(
      duration => {
        it(`should update placeholder preview delayMs=${duration}`, () => {
          cy.slidePlaceholderSlider(duration).then(() => {
            cy.getByTestId("placeholder-preview").contains(duration);
          });
        });
      }
    );
    [1000, 1500, 2000, 2600, 4300, 5000, 6700, 7800, 8900, 9300].forEach(
      duration => {
        it(`should update delayMs param in url with /${duration}`, () => {
          cy.slidePlaceholderSlider(duration).then(() => {
            cy.getByTestId("placeholder-preview").contains(duration);
            cy.url().should("match", new RegExp(`/${duration}$`));
          });
        });
      }
    );
  });
});
