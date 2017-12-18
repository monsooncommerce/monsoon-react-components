import React from 'react';

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onConfirm() {
    this.props.onConfirm();
    this.props.onClose();
  }

  render() {
    const message = this.props.message;
    if (this.props.open) {

      return (
        <div className="confirmation-modal">
          <div className="confirmation-modal__message">
            { message }
          </div>
          <div className="confirmation-modal__buttons">
            <div className="confirmation-modal__button" onClick={this.onConfirm} >
              Yes
            </div>
            <div className="confirmation-modal__button" onClick={this.props.onClose} >
              No
            </div>
          </div>
        </div>
      );
    } else {

      return null;
    }
  }
}

ConfirmationModal.defaultProps = {
  onConfirm: () => {console.log('Modal Confirmed');},
  onClose: () => {console.log('Modal Confirmed');},
  message: 'This is the message',
};

// ConfirmationModal.propTypes = {
//   onConfirm: React.PropTypes.func,
//   onClose: React.PropTypes.func,
//   message: React.PropTypes.string,
// };

export default ConfirmationModal;
