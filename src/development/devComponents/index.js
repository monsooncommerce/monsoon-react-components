

const components = {};
const allComponents = require.context('./', false, /dev.js$/);

allComponents.keys().forEach((key) => {
  const name = key.replace('./','').replace('.dev', '').replace('.js','') + 'Dev';
  if (!components[name]) {
    components[name] = allComponents(key).default;
  }
});

export default components;
