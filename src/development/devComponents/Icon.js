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
        <div>
          <div>{iconName}</div>
          <Icon type={iconName} />
        </div>
      );
    });
  }

  render() {
    const allIcons = this.displayAllIcons(iconSvgBank);

    return(
      <DevSection>
        <div> Im a happy Icon </div>
        { allIcons }
      </DevSection>
    );
  }
}

export default IconDev;
