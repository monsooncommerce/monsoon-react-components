import React from 'react';
import DevSection from '../../development/devComponents/DisplaySection.dev.js';
import Card from './Card';
import cardGuide from './guide.md';
import MarkdownRenderer from 'react-markdown-renderer';

class CardDev extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(

      <div>
        <DevSection label="Default Card">
          <h1>Card</h1>
        </DevSection>
        <div className="markdown-body">
          <MarkdownRenderer markdown={cardGuide} />
        </div>
      </div>

    );
  }
}

export default CardDev;