module.exports = () => {
  const fs = require("fs");
  const REACT_MODULES_DIRECTORY = `${__dirname}/../../react-modules`;
  return fs.readdirSync(REACT_MODULES_DIRECTORY).reduce((acc, file) => {
    if (fs.statSync(`${REACT_MODULES_DIRECTORY}/${file}`).isDirectory()) {
      const pkg = require(`${REACT_MODULES_DIRECTORY}/${file}/package.json`); // eslint-disable-line
      acc[file] = {
        version: pkg.version,
        description: pkg.description
      };
    }
    return acc;
  }, {});
};
