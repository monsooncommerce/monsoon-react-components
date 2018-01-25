# Form

### Import
```
import { Form } from '@monsoon_inc/monsoon-components';
```


### Props
```
export const letterTest = {
  method:  (val) => { return val.match(/[a-zA-Z]/) ? false : true; },
  message: 'No Letters Please'
};

const inputsConfig = [
    {
      name: 'productIdentifier',
      defaultValue: '',
      suffix: '',
      placeholder: 'Enter an ASIN',
      characterLimit: 10,
      optional: false,
      submitOnEnter: true,
      tests: [],
    }
  ];

  const buttonsConfig = [
    {
      name: 'submit',
      type: 'icon',
      label: 'submit',
      action: 'submit'
    },
  ];

```

### Render
```
  <Form inputsConfig={inputsConfig} buttonsConfig={buttonsConfig} onSubmit={this.onSubmit} />
```

### Props
  - #### inputsConfig
    - name: <string> : name of the input
    - defaultValue: <string> <int> <float> : the default value of the input
    - suffix: <string> : this is appear to the right of the input
    - placeholder: <string> : this is the placeholder of the input
    - characterLimit: <int> : the inclusive limit of characters that the input will hold
    - optional: <boolean> : if this option is set to true than the form can be submitted without any value in this input
    - submitOnEnter: <boolean> : if the user presses enter while the form is in focus than the form will submit
    - tests: <array> : the are objects with two function that are passed the input value and return true or false to determine whether the input has errors.

  - #### buttonsConfig
    - name: <string> : name of button
    - type: <string> : type of button (see button options)
    - label: <string> : label of the button
    - action: <string> or <function>:
      - functions passed in will fire when the buttons are clicked
      - ### IMPORTANT! The internal method 'onSubmit' is not the same as the onSubmit passed in as a prop. So if you want a button to submit the form, you have to use the string 'submit' as the value of action
