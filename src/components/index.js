const prodComponents = {};
const devComponentsTmp = {};

const prodModules = require.context('./', true, /^(?!.*\.test\.js$)(?!.*\.test\.js$).*\.js$/);
const devModules = require.context('./', true, /\.dev\.js$/);

// console.log(devModules)
// console.log(prodModules)
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

console.log(devComponentsTmp)
console.log(prodComponents)
export const devComponents = devComponentsTmp;
export default prodComponents;
