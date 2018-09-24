/**
 * This file contains commands specific to the tests of this website
 */

Cypress.Commands.add("slideNetworkSlider", mode => {
  const coordinates = {
    slowNetwork: { x: 2, y: 1 },
    fastNetwork: { x: 100, y: 1 },
    slowEndPoint: { x: 198, y: 1 }
  };
  if (!coordinates[mode]) {
    throw Error(
      `slideNetworkSlider(mode) only accepts ${Object.keys(coordinates).join(
        ", "
      )} as mode`
    );
  }
  const { x, y } = coordinates[mode];
  return cy
    .getByTestId("network-slider")
    .click(x, y)
    .then(el => {
      if (localStorage.getItem("fake-api-network-mode") !== mode) {
        console.warn(
          "Network slider didn't save network mode in localStorage - glitch in Cypress ... patching ..."
        );
        localStorage.setItem("fake-api-network-mode", mode);
      }
      return el;
    });
});
Cypress.Commands.add("slidePlaceholderSlider", (value, maxValue = 10000) =>
  cy.getByTestId("placeholder-slider").slideMaterialUiSlider(value, maxValue)
);

/**
 * slideMaterialUiSlider(value, maxValue)
 *
 * generic command to slide a Material Ui slider
 * Chain it to a selector, example:
 *
 * cy.get('slider').slideMaterialUiSlider(200, 1000)
 */
Cypress.Commands.add(
  "slideMaterialUiSlider",
  {
    prevSubject: true
  },
  (cypressElement, value, maxValue) =>
    cy.wrap(cypressElement).then(el => {
      const width = Cypress.$(el).width();
      // make sure not to take horizontal padding in account when calculating coordinates ratio
      const horizontalPadding = parseInt(
        Cypress.$(el)
          .css("padding")
          .split(" ")
          .pop(),
        10
      );
      const position = parseInt(
        (value * (width + horizontalPadding * 2)) / maxValue,
        10
      );
      cy.wrap(el).click(position, 1);
    })
);
