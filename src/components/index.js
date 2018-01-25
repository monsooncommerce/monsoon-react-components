const prodComponents = {};
const devComponentsTmp = {};

// if you don't know what these lines are about are check
// this out https://webpack.js.org/guides/dependency-management/
const prodModules = require.context('./', true, /^(?!.*\.test\.js$)(?!.*\.test\.js$).*\.js$/);
const devModules = require.context('./', true, /\.dev\.js$/);

prodModules.keys().forEach((key) => {
  const name = key.split('/').slice(-1)[0].replace('.js','');
  if (!prodComponents[name] && name !== 'index') {
    prodComponents[name] = prodModules(key).default;
  }
});

devModules.keys().forEach((key) => {
  const name = key.split('/').slice(-1)[0].replace('.js','').replace('.dev', 'Dev');
  if (!devComponentsTmp[name] && name !== 'index') {
    devComponentsTmp[name] = devModules(key).default;
  }
});

export const devComponents = devComponentsTmp;
export default prodComponents;
