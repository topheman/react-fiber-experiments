/* eslint-disable no-param-reassign */

const { injectBabelPlugin } = require("react-app-rewired");

module.exports = function override(config, env) {
  // add a plugin
  config = injectBabelPlugin("babel-plugin-macros", config);

  console.log(`[REWIRE][${env}]`);

  config.resolve = {
    // search in react-modules before node_modules
    modules: ["react-modules", "node_modules"]
  };

  return config;
};
