import React from 'react';
import DevSection from './DevSection';
import Modal from '../../components/modal/Modal';
import ConfirmationModal from '../../components/confirmationModal/ConfirmationModal';

class ModalDev extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationModalOpen: true,
    }

    this.confirmationModalClose = this.confirmationModalClose.bind(this);
  }

  confirmationModalClose() {
    this.setState({...this.state, confirmationModalOpen: false});
  }

  render() {
    return(
      <div>
        <DevSection className='modal-dev' label="Modal Dev">
          <Modal open='true'>
            <div> I am in a modal! </div>
          </Modal>
        </DevSection>
        <DevSection className='modal-dev' label="Modal Dev">
          <ConfirmationModal
            open={this.state.confirmationModalOpen}
            onConfirm={this.confirmationModalClose}
            onClose={this.confirmationModalClose}
            message={'Are you sure you want to close the Confirmation Modal'}
          >
          </ConfirmationModal>
        </DevSection>
      </div>
    );
  }
}

export default ModalDev;
