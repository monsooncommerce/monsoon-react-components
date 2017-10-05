import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount() {
    console.log('INPUT!!!!!!', this.input)
    if (this.props.autofocus) {
      this.onFocus();
    }
  }


/// refactor start here ////
  outputFormatter(value) {
    const formatter = this.props.outputFormatter;
    if ( typeof formatter === 'function' ) {
      return formatter(value);
    } else if (formatter instanceof RegExp) {
      return value.replace(formatter, '');
    }
  }

  displayFormatter(value) {
    const formatter = this.props.displayFormatter;
    if ( typeof formatter === 'function' ) {
      return formatter(value);
    } else if (formatter instanceof RegExp)  {
      return value.replace(formatter, '');
    }
  }

  inputTest(value) {
    const formatter = this.props.inputTest;
    if ( typeof formatter === 'function' ) {
      return formatter(value);
    } else if (formatter instanceof RegExp)  {
      return value.replace(formatter, '');
    }
  }
//// refactor end here ////

  getOutput({ DOMEvent, activeStatus } = {}) {
    const value = DOMEvent.target.value;
    const name = this.props.name;
    const formattedValue = this.outputFormatter(value);
    const testPassed = this.props.outputTest(value);
    const output = {
        DOMEvent,
        value: formattedValue,
        active: activeStatus,
        name,
      }

    if (!testPassed) {
      output.error = true;
    }

    return output;
  }

  onChange(e) {
    const output = this.getOutput({
      DOMEvent: e,
      activeStatus: true
    });

    this.props.onChange(output);
  }

  onFocus() {
    this.input.focus();
    this.setState({ active: true });
  }

  onKeyUp(e) {
    const output = this.getOutput({
      DOMEvent: e,
      activityStatus: true,
    })
    this.props.onKeyUp(output);
  }

  onBlur(e) {
    const output = this.getOutput({
      DOMEvent: e,
      activeStatus: false
    });

    this.props.onChange(output);
    this.setState({ active: false });
  }

  render() {
    const display = this.displayFormatter(this.props.value)
    const suffix = this.props.suffix;
    const displayLength = 30;
    const scopeClass = this.props.scopeClass;
    const placeholder = this.props.placeholder;
    const activeClass = this.state.active ? 'active' : '';
    const classNames = `input ${activeClass}`;

    return (
      <div className={ classNames } onClick={ this.onFocus }>
        <div className={`input__input-carriage`}>
          <input
            className={`input__input`}
            ref={ input => { this.input = input } }
            style={ { width: `${displayLength}px` } }
            value={ display }
            onChange={ this.onChange }
            onBlur={ this.onBlur }
            onKeyUp={ this.onKeyUp }
            placeholder={ placeholder }
          />
          <span className={`input__suffix`}>
            {suffix}
          </span>
        </div>
      </div>
    )
  }
}

Input.defaultProps = {
  scopeClass: '',
  displayFormatter: (val) => val,
  outputFormatter: (val) => val,
  onChange: (val) => val,
  onKeyUp: () => true,
  outputTest: () => true,
  onBlur: () => true,
}

export default Input;
