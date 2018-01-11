import React from 'react';
import DevSection from './DisplaySection.dev';
import Icon, { iconSvgBank } from '../../components/icons';

import iconGuide from '../../components/icons/guide.md';
import MarkdownRenderer from 'react-markdown-renderer';

class IconDev extends React.Component {
  constructor(props) {
    super(props);
  }

  displayAllIcons(icons) {
    return Object.keys(icons).map((iconName)=> {
      return (
        <div className="icon-box">
          <div className="icon-title">{iconName}</div>
          <Icon type={iconName} />
        </div>
      );
    });
  }

  render() {
    const allIcons = this.displayAllIcons(iconSvgBank);

    return(
      <div>
        <DevSection label="Icons">
          <div className="icon-rows">
          { allIcons }
          </div>
        </DevSection>
        <MarkdownRenderer markdown={iconGuide} />
      </div>
    );
  }
}

export default IconDev;
