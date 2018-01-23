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
import DevSection from './DisplaySection.dev';
// import ${compName} from '../../components/buttons/${compName}';
// import ${compName}Guide from '../../components/${dirName}/guide.md';
import MarkdownRenderer from 'react-markdown-renderer';

class ${compName} extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(

      <div>
        <DevSection label="Default ${compName}">
          <h1>${compName}</h1>
        </DevSection>

        <MarkdownRenderer markdown={'# ${compName} guide'} />
      </div>

    );
  }
}

export default ${compName};`;
};

const guideTemplate = (compName) => {
  return `### Import
\`\`\`
import { ${compName} } from '@monsoon_inc/component-library';
\`\`\`

# Buttons

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
    <${compName}
      open={true}
    >
      <div> foo </div>
      <div> bar </div>
    </${compName}>
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

const createDevComponent = function(compName) {
  fs.writeFileSync(`./src/development/devComponents/${compName}.dev.js`, writeTemplate(compName));
};

const createComponent = function(compName, dirName) {
  fs.mkdirSync(`./src/components/${dirName}`);
  fs.writeFileSync(`./src/components/${dirName}/${compName}.js`, componentTemplate(compName));
  fs.writeFileSync(`./src/components/${dirName}/guide.md`, guideTemplate(compName));
  fs.writeFileSync(`./src/components/${dirName}/${detitlize(compName)}.test.js`, testTemplate(compName));
  fs.writeFileSync(`./src/components/${dirName}/_${detitlize(compName)}.scss`);
};

inquirer.prompt(questions).then((answers) => {
  const compName = titlize(answers.compName);
  const dirName = detitlize(answers.dirName);
  createComponent(compName, dirName);
  createDevComponent(compName);
});
