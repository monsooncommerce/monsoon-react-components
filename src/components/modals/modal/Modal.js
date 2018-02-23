import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.onConfirm = this.onConfirm.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onConfirm() {
    this.props.onConfirm();
    this.props.onClose();
  }

  onClose() {
    this.props.onClose();
  }

  render() {
    if (this.props.open) {

      return (
        <div>
          <div className="modal">
          <div className="modal__overlay" onClick={this.onClose} />
          <div className="modal__content">
            { this.props.children }
          </div>
        </div>
      </div>
    );

    } else {

      return null;
    }
  }
}

Modal.defaultProps = {
  onConfirm: () => { console.log('this was confirmed');},
  onClose: () => { console.log('this was closed');},
  open: false,
};

Modal.propTypes = {
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Modal;
