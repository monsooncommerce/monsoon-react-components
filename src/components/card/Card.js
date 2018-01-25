import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <div className="card__head">
          {this.props.title}
        </div>
        <div className="card__body">
          { this.props.children }
        </div>
        <div className="card__footer">
          footer
        </div>
      </div>
    );
  }
}

Card.defaultProps = {};
Card.propTypes = {};

export default Card;
