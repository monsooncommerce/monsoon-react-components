import React from 'react';

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
      <div className={`table`} key={`I love cows`}>
        {rows}
      </div>
    );
  }
}

Table.defaultProps = {};

export default Table;
