import React from 'react';
import DevSection from '../../development/devComponents/DisplaySection.dev.js';
import ImagePlaceholder from './ImagePlaceholder';
import placeholderGuide from './guide.md';
import MarkdownRenderer from 'react-markdown-renderer';

class PlaceholdersDev extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(

      <div>
        <DevSection label="Image Placeholder">
          <ImagePlaceholder />
        </DevSection>

        <div className="markdown-body">
          <MarkdownRenderer markdown={placeholderGuide} />
        </div>
      </div>

    );
  }
}

export default PlaceholdersDev;
