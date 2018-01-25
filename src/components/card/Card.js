import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-wrapper">
        Hello, I am Card
      </div>
    );
  }
}

Card.defaultProps = {};
Card.propTypes = {};

export default Card;