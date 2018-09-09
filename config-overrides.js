/* eslint-disable no-param-reassign */
module.exports = function override(config, env) {
  console.log(`[REWIRE][${env}]`);
  config.resolve = {
    // search in react-modules before node_modules
    modules: ["react-modules", "node_modules"]
  };
  return config;
};
