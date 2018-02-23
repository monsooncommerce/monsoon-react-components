import React from 'react';
import PropTypes from 'prop-types';

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  getRows(dataObject, scopeClass) {
    return Object.keys(dataObject).map((key, i) => {
      return (
        <div className={`table__row `} key={`table-row-${i}`}>
          <div className={`table__cell key`}>{ this.props.config.keyFormatter(key) }</div>
          <div className={`table__cell  value`}>{ this.getValue(dataObject[key]) }</div>
        </div>
      );
    });
  }

  getValue(value) {
    try {
      if ( value && typeof value === 'object') {
        return value.component;
      } else {
        return this.props.config.valueFormatter(value);
      }
    } catch (e) {
      return '';
    }
  }

  render() {
    const scopeClass = this.props.scopeClass;
    const data = this.props.data;
    const rows = this.getRows(data, scopeClass);

    return (
      <div className={`I am a row!`} key={`I am a value!`}>
        {rows}
      </div>
    );
  }
}

Table.defaultProps = {
  data: {},
  config: {},
};

Table.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object,
};

export default Table;
