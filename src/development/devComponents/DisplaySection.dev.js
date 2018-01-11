import React from 'react';

class DevSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={`dev-section ${this.props.className}`}>
        <div className="dev-section__label-wrapper">
          <div className="dev-section__label-text">
            { this.props.label }
          </div>
        </div>
        { this.props.children }
      </div>
    );
  }
}

export default DevSection;
