import React from 'react';
import Input from './Input';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmittable: false,
      submitted: false,
      inputs: {},
      buttons: {},
    }

    this.onChange = this.onChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    // create an object to act as a temporary store to manage input state
    const inputManagementState = {};
    const buttonManagementState = {};


    // populate the store object with values from the config and a few not in the config.
    this.props.inputsConfig.forEach(input => {
      inputManagementState[input.name] = input;
      inputManagementState[input.name].value = input.defaultValue;
      inputManagementState[input.name].active = false;
      inputManagementState[input.name].errors = [];
    })

    this.props.buttonsConfig.forEach(button => {
      buttonManagementState[button.name] = button;
      buttonManagementState[button.name].enabled = true;
    })

    // merge the olde state with the new input management object.
    const newState = {inputs: inputManagementState, buttons: buttonManagementState}
    this.setState( {...this.state, inputs: inputManagementState, buttons: buttonManagementState } )
  }

  onKeyUp(e) {
    if (e.DOMEvent.key === 'Enter') {
      this.onSubmit();
    }
  }

  testInput(name, value) {
    const input = this.state.inputs[name];
    const errors = [];
    let passedTest = true;

    // this is set in the input config
    const inputIsOptional = input.optional;

    if (!inputIsOptional) {
      const valueIsEmpty = value === '';

      if (valueIsEmpty) {
        passedTest = false;
        errors.push('This field is required');
      }

    }

    // if there are tests, then loop through, calling the methods, pushing
    // the messages into the respective input objects if the tests fail

    if (input.tests.length > 0) {
      input.tests.forEach(test => {
        const { method, message } = test;
        const methodReturnsFalse = !method(value);
        if (methodReturnsFalse) {
          passedTest = false;
          errors.push(message);
        }
      })
    }

    return {passedTest, errors}
  }

  limitChar(name, value) {
    const limit = this.state.inputs[name].characterLimit;

    console.log(limit, value.length >= limit)

    if (value.length > limit) {
      return true;
    }

    return false;
  }

  onChange(inputValues) {
    const name = inputValues.name;
    const value = inputValues.value;
    const inputTest = this.testInput(name, value);
    const { passedTest, errors } = inputTest;

    const valueExceededLimit = this.limitChar(name, value);

    if (valueExceededLimit) {
      return;
    }

    // if (passedTest) {
    //   const oldState = this.state;
    //   const clonedState = clone(oldState);
    //   clonedState.inputs[name].value = value;
    //   const newState = merge(oldState, clonedState);
    //   this.setState(newState);
    // };

    const newInputs = {...this.state.inputs};

    newInputs[name].errors = [];
    newInputs[name].value = value;
    newInputs[name].errors = errors;

    const newState = { ...this.state, inputs: newInputs };

    this.setState(newState);
  }

  getInputs(inputs, submitted) {
    return Object.keys(inputs).map( inputKey => {
      const input = inputs[inputKey];

      const label = input.label;
      const tests = input.tests;
      const active = input.active;
      const submitOnEnter = input.submitOnEnter;
      const errors = input.errors;

      // if there is no label, don't render the label container
      const labelDisplay = !label ? null : (
        <div className={`form__input-container-label`}>
          { label }
        </div>
      );

      const onKeyUp = submitOnEnter ? this.onKeyUp : () => null;
      const errorsDisplay = submitted && input.errors.length >= 1 ? <div> <Icon type="attention"/> </div>  : null;

      console.log(input.errors, this.state)

      return (
        <div className={`form__input-container`}>
          { labelDisplay }
          <div className={`form__input-wrapper`} >
            <Input
              key={input.name}
              value={input.value}
              name={input.name}
              suffix={input.suffix}
              onKeyUp={onKeyUp}
              active={active}
              placeholder={input.placeholder}
              ref={ (input) => this[inputKey] = input }
              onChange={this.onChange}
            />
          </div>
          <div className={`form__input-container-errors`}>
            {errorsDisplay}
          </div>
       </div>
     )
    })
  }

  getButtons(buttons, ) {
    // return Object.keys(buttons).map( buttonKey => {
    //   const button = buttons[buttonKey];
    //   const action = button.action === 'submit' ? this.onSubmit : button.action;
    //   return <Button label={button.label} onClick={action}/>
    // });
  }

  getOutput() {
    // get data and instantiate holder objects
    const stateInputs = this.state.inputs;
    const formExportObject = {};

    // populate holder object
    Object.keys(stateInputs).forEach(inputKey => {
      const input = stateInputs[inputKey];
      const inputExportObject = {};

      inputExportObject.value = input.value;
      inputExportObject.name = input.name;
      inputExportObject.errors = input.errors;

      // put the input holder object into the form holder object
      formExportObject[input.name] = inputExportObject;
    })

    return formExportObject;
  }

  onSubmit() {
    let errors = false;
    const state = this.state;
    const stateInputs = state.inputs;
    const output = this.getOutput();

    Object.keys(stateInputs).forEach(inputKey => {
      const input = stateInputs[inputKey];
      if (input.errors.length > 0) {
        errors = true;
      }
    });

    if (errors) {
      this.setState({...this.state, submitted: true})
      return null
    }


    this.props.onSubmit(output);
    this.setState({...this.state, submitted: true})
  }

  render() {
    const submitted = this.state.submitted;
    const inputs = this.state.inputs;
    const buttons = this.state.buttons;
    const inputsDisplay = this.getInputs(inputs, submitted);
    const buttonsDisplay = this.getButtons(buttons);

    return(
      <div className={`form`}>
        <div className={`form__inputs`}>
          { inputsDisplay }
        </div>
        <div className={`form__buttons`}>
          { buttonsDisplay }
        </div>
      </div>
    )
  }
}

Form.defaultProps = {
  buttonsConfig: [],
  inputConfig: [],
}

export default Form;
