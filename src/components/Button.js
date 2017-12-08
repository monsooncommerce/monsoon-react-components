import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  getDefaultButton(label, onClick) {
    return (
      <div className={`button`} onClick={ onClick }>
        { label }
      </div>
    );
  }

  getIconButton() {
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
  label: 'Click here, dammit',
  onClick: () => {},
  type: 'default',
  icon: "submit",
};

export default Button;
