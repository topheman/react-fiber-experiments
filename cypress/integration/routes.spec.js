describe("Routes", () => {
  describe("redirects", () => {
    [
      {
        from: "/suspense/async-rendering",
        to: "/suspense/async-rendering/delayMs/350"
      },
      {
        from: "/suspense/async-rendering/delayMs/DEFAULT_DELAY_MS/course/react",
        to: "/suspense/async-rendering/delayMs/350/course/react"
      },
      { from: "/suspense/placeholder", to: "/suspense/placeholder/delayMs/350" }
    ].forEach(({ from, to }) => {
      it(`should redirect ${from} -> ${to}`, () => {
        cy.visit(from);
        cy.url().should("match", new RegExp(`${to}$`));
      });
    });
  });
});
