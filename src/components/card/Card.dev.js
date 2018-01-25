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
          <Card title="Hello">
            <div> I am the card body </div>
            <div> I am the card body </div>
            <div> I am the card body </div>
          </Card>
        </DevSection>
        <div className="markdown-body">
          <MarkdownRenderer markdown={cardGuide} />
        </div>
      </div>

    );
  }
}

export default CardDev;
