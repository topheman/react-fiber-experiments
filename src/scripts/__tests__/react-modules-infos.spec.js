import reactModulesInfos from "../react-modules-infos";

describe("react-modules-infos", () => {
  const retrievedReactModulesInfos = reactModulesInfos();
  it("result should match snapshot", () => {
    expect(retrievedReactModulesInfos).toMatchSnapshot();
  });
});
