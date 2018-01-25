const fs = require('fs');
const inquirer = require('inquirer');

const questions = [
  {
   type: 'input',
   message: 'What is the name of the component?',
   name: 'compName'
  },
  {
    type: 'input',
    message: 'What is the name of the directory?',
    name: 'dirName'
  }
];

const writeTemplate = (compName, dirName) => {
  return `import React from 'react';
import DevSection from '../../development/devComponents/DisplaySection.dev.js';
import ${compName} from './${compName}';
import ${detitlize(compName)}Guide from './guide.md';
import MarkdownRenderer from 'react-markdown-renderer';

class ${compName}Dev extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(

      <div>
        <DevSection label="Default ${compName}">
          <${compName} />
        </DevSection>
        <div className="markdown-body">
          <MarkdownRenderer markdown={${detitlize(compName)}Guide} />
        </div>
      </div>

    );
  }
}

export default ${compName}Dev;`;
};

const guideTemplate = (compName) => {
  return `# ${compName}
### Import
\`\`\`
import { ${compName} } from '@monsoon_inc/component-library';
\`\`\`

### Render Example
\`\`\`
  <${compName} />
\`\`\`

### Props
  - N/A`;
};
const componentTemplate = (compName) => {
  return `import React from 'react';

class ${compName} extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="${compName}-wrapper">
        Hello, I am ${compName}
      </div>
    );
  }
}

${compName}.defaultProps = {};
${compName}.propTypes = {};

export default ${compName};`;
};

const testTemplate = (compName) => {
  return `import React from 'react';
import renderer from 'react-test-renderer';

import ${compName} from './${compName}';

test('dafault modal snapshot', () => {
  const snapshot = renderer.create(
    <${compName}/>
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});`;
};

const detitlize = (word)=> {
  return word.replace(/^[a-zA-Z]/, (firstChar) => {
    return firstChar.toLowerCase();
  });
};

const titlize = (word)=> {
  return word.replace(/^[a-zA-Z]/, (firstChar) => {
    return firstChar.toUpperCase();
  });
};

const createComponent = function(compName, dirName) {
  try {
    fs.mkdirSync(`./src/components/${dirName}`);
    fs.writeFileSync(`./src/components/${dirName}/${compName}.dev.js`, writeTemplate(compName, dirName));
    fs.writeFileSync(`./src/components/${dirName}/${compName}.js`, componentTemplate(compName));
    fs.writeFileSync(`./src/components/${dirName}/guide.md`, guideTemplate(compName));
    fs.writeFileSync(`./src/components/${dirName}/${detitlize(compName)}.test.js`, testTemplate(compName));
    fs.writeFileSync(`./src/components/${dirName}/_${detitlize(compName)}.scss`, '');
    fs.appendFileSync(`./src/lib/index.js`, `export const ${compName} = components.${compName};`);
    fs.appendFileSync(`./src/components/index.scss`, `@import "${dirName}/${compName}"`);
  } catch (e) {
    console.log(e);
  }
};

inquirer.prompt(questions).then((answers) => {
  const compName = titlize(answers.compName);
  const dirName = detitlize(answers.dirName);
  createComponent(compName, dirName);
});
