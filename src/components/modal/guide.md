------

### Import

```
import { Modal, ConfirmationModal } from '@monsoon_inc/component-library';
```
&nbsp;

-------

### Examples:
```
<Modal open='true'>
  <div> I am in a modal! </div>
</Modal>

<ConfirmationModal
  open={this.state.confirmationModalOpen}
  onConfirm={this.confirmationModalClose}
  onClose={this.confirmationModalClose}
  message={'Are you sure you want to close the Confirmation Modal'}
/>
```
&nbsp;

-------

### props:
- open: Boolean that determines whether the modal displays or not
- onConfirm: Function triggered when user clicks on "Yes"
- onConfirm: Function triggered when user clicks on "No"
- message: String displayed to the user in the modal
