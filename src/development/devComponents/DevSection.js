import React from 'react';

class DevSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        Dev Section
        { this.props.children }
      </div>
    );
  }
}

export default DevSection;
