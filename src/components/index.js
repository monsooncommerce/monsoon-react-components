const components = {};
const allComponents = require.context('./', true, /^(?!.*\.test\.js$).*\.js$/);

allComponents.keys().forEach((key) => {
  const name = key.split('/').slice(-1)[0].replace('.js','');
  if (!components[name] && name !== 'index') {
    components[name] = allComponents(key).default;
  }
});

export default components;
