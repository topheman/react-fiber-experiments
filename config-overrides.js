const {
  rewireWorkboxInject,
  defaultInjectConfig
} = require("react-app-rewire-workbox");
const path = require("path");

module.exports = function override(originalConfig, env) {
  let config = originalConfig;
  const CUSTOM_SW_PATH = path.join(__dirname, "src", "custom-sw.js");

  // Add custom-sw to transpilation
  // react-app-rewire-workbox doesn't transpile swSrc, so this is a test
  config = {
    ...config,
    entry: {
      app: config.entry,
      sw: CUSTOM_SW_PATH
    }
  };

  // Workbox
  console.log("[Workbox] Preparing Service Worker");
  // Extend the default injection config with required swSrc
  const workboxConfig = {
    ...defaultInjectConfig,
    swDest: `service-worker.${env === "production" ? "prod" : "dev"}.js`,
    swSrc: CUSTOM_SW_PATH
  };
  const finalWorkboxConfig = rewireWorkboxInject(workboxConfig)(config, env);

  console.log(config);
  console.log(workboxConfig);

  return {
    ...config,
    ...finalWorkboxConfig
  };
};
