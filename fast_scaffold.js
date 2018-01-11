const fs = require('fs');
const inquirer = require('inquirer');

const componentName = 'FuckYeah';
const dirName = 'FuckYeahs';

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



const writeTemplate = (compName) => {
  return `
  import React from 'react';
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

  export default ${compName};
  `;
};

const createDevComponent = function(compName) {
  fs.writeFileSync(`./src/development/devComponents/${compName}.dev.js`, writeTemplate(compName));
};

inquirer.prompt(questions).then((answers) => {
  const compName = answers.compName;
  createDevComponent(compName);
});
