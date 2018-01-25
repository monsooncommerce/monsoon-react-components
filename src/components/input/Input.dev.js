import React from 'react';
import DevSection from '../../development/devComponents/DisplaySection.dev.js';
import Input from './Input';
import inputGuide from './guide.md';
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

        <div className="markdown-body">
          <MarkdownRenderer markdown={inputGuide} />
        </div>
      </div>
    );
  }
}

export default InputDev;
