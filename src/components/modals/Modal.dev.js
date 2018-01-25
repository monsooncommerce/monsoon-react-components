import React from 'react';
import DevSection from '../../development/devComponents/DisplaySection.dev.js';
import Modal from './modal/Modal';
import ConfirmationModal from './confirmationModal/ConfirmationModal';
import modalGuide from './guide.md';

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

        <DevSection key="default" className='modal-dev' label="Modal">
          <Modal open='true'>
            <div> I am in a modal! </div>
          </Modal>
        </DevSection>

        <DevSection key="confirmation" className='modal-dev' label="Confirmation Modal">
          <ConfirmationModal
            open={this.state.confirmationModalOpen}
            onConfirm={this.confirmationModalClose}
            onClose={this.confirmationModalClose}
            message={'Are you sure you want to close the Confirmation Modal'}
          />
        </DevSection>
        <div className="markdown-body">
          <MarkdownRenderer markdown={modalGuide} />
        </div>
      </div>
    );
  }
}

export default ModalDev;
