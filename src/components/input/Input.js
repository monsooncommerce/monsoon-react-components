import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.selectValue = this.selectValue.bind(this);
  }

  componentDidMount() {
    if (this.props.autofocus) {
      this.onFocus();
    }
  }

  getOutput({ DOMEvent, activeStatus } = {}) {
    const value = DOMEvent.target.value;
    const name = this.props.name;
    const output = {
        DOMEvent,
        value,
        active: activeStatus,
        name,
      };

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
    });
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

  selectValue() {
    const input = this.input;
    input.setSelectionRange(0, input.value.length);
  }

  render() {
    const suffix = this.props.suffix;
    const scopeClass = this.props.scopeClass;
    const placeholder = this.props.placeholder;
    const classNames = classnames(`input`, { 'active': this.state.active });

    return (
      <div className={ classNames } onDoubleClick={this.selectValue} onClick={ this.onFocus }>
        <div className={`input__input-carriage`}>
          <input
            className={`input__input`}
            ref={ input => { this.input = input; } }
            value={ this.props.value }
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
    );
  }
};

Input.defaultProps = {
  onChange: (val) => val,
  onKeyUp: () => true,
  outputTest: () => true,
  onBlur: () => true,
};

Input.defaultProps = {
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Input;
