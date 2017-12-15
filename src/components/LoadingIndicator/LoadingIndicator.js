import React from 'react';
import Icon from '../icons';

class LoadingIndicator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loading-indicator">
        <Icon type="loading" />
      </div>
    );
  }
}

export default LoadingIndicator;
