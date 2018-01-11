import ButtonsDev from './Buttons.dev';
import IconDev from './Icon.dev';
import LoadingIndicatorDev from './LoadingIndicator.dev';
import TableDev from './Table.dev';
import ModalDev from './Modal.dev';
import HomeDev from './Home.dev';
import PlaceholdersDev from './Placeholders.dev';

const components = {};
const allComponents = require.context('./', false, /dev.js$/);

allComponents.keys().forEach((key) => {
  const name = key.replace('./','').replace('.dev', '').replace('.js','') + 'Dev';
  if (!components[name]) {
    components[name] = allComponents(key).default;
  }
});

export default components;
