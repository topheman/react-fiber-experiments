import { _configModes } from "../api";

describe("/libs/fake-api", () => {
  describe("api", () => {
    describe("_configModes", () => {
      it("should prepare a ready to be used config by default", () => {
        const modes = _configModes();
        expect(modes).toMatchSnapshot();
      });
    });
  });
});
