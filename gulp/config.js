const path = require('path');
const fs = require('fs');
const getEnv = require('./utils/get-env');
const bundles = (srcPath) => fs.readdirSync(path.resolve(__dirname, srcPath)).filter(name => name.indexOf('.bundle') > -1).map(name => name.replace(/\.bundle.*$/g, ''));

module.exports = function(RAW_ENV) {
  const ENV = getEnv(RAW_ENV);

  console.log(`Building config for ${ENV} environment`);
  const EnvConfig = {
    CLIENT_VERSION: require('../package.json').version,
  };

  return {
    ENV,
    NODE_MODULES: [
    ],
    VERSION: EnvConfig.CLIENT_VERSION,
    CSS_BUNDLES: bundles('../styles')
  };
};