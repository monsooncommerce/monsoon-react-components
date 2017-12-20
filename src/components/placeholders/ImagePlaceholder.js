import React from 'react';
import Icon from '../icons';

class ImagePlaceholder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="image-placeholder">
        <Icon type="image" />
        <div className="image-placeholder__label">
          Image Not Available
        </div>
      </div>
    );
  }
}

export default ImagePlaceholder;
