import React from 'react';
import DevSection from './DevSection';
import Icon, { iconSvgBank } from '../../components/icons';

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
      <DevSection>
        <div className="icon-rows">
          { allIcons }
        </div>
      </DevSection>
    );
  }
}

export default IconDev;
