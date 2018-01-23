import React from 'react';
import DevSection from './DisplaySection.dev';
import Modal from '../../components/modal/Modal';
import ConfirmationModal from '../../components/confirmationModal/ConfirmationModal';
import modalGuide from '../../components/modal/guide.md';

import MarkdownRenderer from 'react-markdown-renderer';

class ModalDev extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationModalOpen: true,
    };

    this.confirmationModalClose = this.confirmationModalClose.bind(this);
  }

  confirmationModalClose() {
    this.setState({...this.state, confirmationModalOpen: false});
  }

  render() {
    return(
      <div>

        <DevSection className='modal-dev' label="Modal">
          <Modal open='true'>
            <div> I am in a modal! </div>
          </Modal>
        </DevSection>

        <DevSection className='modal-dev' label="Confirmation Modal">
          <ConfirmationModal
            open={this.state.confirmationModalOpen}
            onConfirm={this.confirmationModalClose}
            onClose={this.confirmationModalClose}
            message={'Are you sure you want to close the Confirmation Modal'}
          />
        </DevSection>
        
        <MarkdownRenderer markdown={modalGuide} />
      </div>
    );
  }
}

export default ModalDev;
