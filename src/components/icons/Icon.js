import React from 'react';
import propTypes from 'prop-types';
import icons from './iconSvgBank';

class Icon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const type = this.props.type;
    const icon = icons[type] ? icons[type] : icons['column'];
    const styles = {overflow: 'hidden'};
    const width = this.props.width;
    const height = this.props.height;

    if (width) {
      styles.width = width;
    } else {
      styles.height = height;
    }

    return (
      <svg className="icon border"
        viewBox={ icon.viewBox }
        style={ styles }
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
          { icon.svg }
      </svg>
    );
  }
}

Icon.defaultProps = { type: 'column' };
Icon.propTypes = {
  width: propTypes.number,
  height: propTypes.number,
  type: propTypes.string,
};

export default Icon;
