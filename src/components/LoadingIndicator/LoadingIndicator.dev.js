import React from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import DevSection from '../../development/devComponents/DisplaySection.dev.js';
import LoadingIndicator from './LoadingIndicator';
import loadingIndicatorGuide from './guide.md';

class LoadingIndicatorDev extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <DevSection label="Loading Indicator">
          <LoadingIndicator />
        </DevSection>
        <div className="markdown-body">
          <MarkdownRenderer markdown={loadingIndicatorGuide} />
        </div>
      </div>
    );
  }
}

export default LoadingIndicatorDev;
