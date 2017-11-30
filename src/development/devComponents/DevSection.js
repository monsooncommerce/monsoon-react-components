import React from 'react';

class DevSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="dev-section">
        { this.props.children }
      </div>
    );
  }
}

export default DevSection;
