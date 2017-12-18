import React from 'react';

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

// Modal.propTypes = {
//   onConfirm: React.PropTypes.func,
//   onClose: React.PropTypes.func,
//   open: React.PropTypes.bool,
// };

export default Modal;
