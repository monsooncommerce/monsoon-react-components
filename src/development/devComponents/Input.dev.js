import React from 'react';
import DevSection from './DisplaySection.dev';
import Input from '../../components/input/Input';
import InputGuide from '../../components/input/guide.md';
import MarkdownRenderer from 'react-markdown-renderer';

class InputDev extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(

      <div>
        <DevSection label="Default Input">
          <Input />
        </DevSection>

        <MarkdownRenderer markdown={'# Input guide'} />
      </div>

    );
  }
}

export default InputDev;
