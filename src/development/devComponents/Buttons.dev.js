import React from 'react';
import DevSection from './DisplaySection.dev';
import Button from '../../components/buttons/Button';
import buttonGuide from '../../components/buttons/guide.md';
import MarkdownRenderer from 'react-markdown-renderer';


class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(

      <div>
        <DevSection label="Default Button">
          <Button label="I am button"/>
        </DevSection>
        <DevSection label="Icon Button">
          <Button type="icon" icon="trash"/>
          <Button type="icon" icon="download"/>
          <Button type="icon" icon="trends"/>
          <Button type="icon" icon="watchlist"/>
        </DevSection>

        <MarkdownRenderer markdown={buttonGuide} />
      </div>

    );
  }
}

export default Buttons;
