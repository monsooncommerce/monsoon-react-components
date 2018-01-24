import React from 'react';
import DevSection from '../../development/devComponents/DisplaySection.dev.js';
import LoadingIndicator from './LoadingIndicator';

class LoadingIndicatorDev extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <DevSection label="Loading Indicator">
          <LoadingIndicator />
        </DevSection>
      </div>
    );
  }
}

export default LoadingIndicatorDev;
