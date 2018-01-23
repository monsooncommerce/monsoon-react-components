import React from 'react';
import Icon from '../icons';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  getDefaultButton(label, onClick) {
    return (
      <div className={`button default-button`} onClick={ onClick }>
        { label }?
      </div>
    );
  }

  getIconButton(icon, onClick) {
    return (
      <div
        className="button icon-button"
        onClick={ onClick }>
        <Icon type={ icon } />
      </div>
    );
  }

  render() {
    const { label, onClick, type, icon } = this.props;
    var button = this.getDefaultButton(label, onClick);

    if (type === 'icon') {
      button = this.getIconButton(icon, onClick);
    }

    return button;
  }
}

Button.defaultProps = {
  label: 'Click me!',
  onClick: () => {},
  type: 'default',
  icon: 'submit',
};

export default Button;
