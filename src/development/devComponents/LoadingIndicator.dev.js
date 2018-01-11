import React from 'react';
import DevSection from './DisplaySection.dev';
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator';

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
