module.exports = function override(config, env) {
  console.log(`[REWIRE][${env}]`);
  return config;
};
