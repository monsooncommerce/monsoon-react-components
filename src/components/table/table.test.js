import React from 'react';
import renderer from 'react-test-renderer';

import Table from './Table';

const testTableData = {
  I: 'am',
  a: 'donut'
};

const testTableConfig = {
  keyFormatter: (val) => val,
  valueFormatter: (val) => val,
};

test('default table snapshot test', () => {
  const snapshot = renderer.create(
    <Table
      data={testTableData}
      config={testTableConfig}
    />
  );

  expect(snapshot).toMatchSnapshot();
});
