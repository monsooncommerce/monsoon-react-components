import React from 'react';
import DevSection from './DevSection';
import Table from '../../components/table/Table';

const testTableData = {
  'key_one': 'value_one',
  'key_two': 'value_two',
};

const testTableConfig = {
  keyFormatter: (val) => val,
  valueFormatter: (val) => val,
};

class TableDev extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <DevSection label="Table Indicator">
          <Table
            data={testTableData}
            config={testTableConfig}
          />
        </DevSection>
      </div>
    );
  }
}

export default TableDev;
