
  import React from 'react';
  import DevSection from './DisplaySection.dev';
  // import Form from '../../components/buttons/Form';
  // import FormGuide from '../../components/FuckYeahs/guide.md';
  import MarkdownRenderer from 'react-markdown-renderer';

  class Form extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return(

        <div>
          <DevSection label="Default Form">
            <h1>Form</h1>
          </DevSection>

          <MarkdownRenderer markdown={'# Form guide'} />
        </div>

      );
    }
  }

  export default Form;
  