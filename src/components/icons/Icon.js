import React from 'react';
import PropTypes from 'prop-types';
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
      <div className="icon-wrapper">
        <svg
          viewBox={ icon.viewBox }
          style={ styles }
          version="1.1"
          xmlns="http://www.w3.org/2000/svg">
            { icon.svg }
        </svg>
      </div>
    );
  }
}

Icon.defaultProps = { type: 'column' };
Icon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  type:  PropTypes.string,
};

export default Icon;
