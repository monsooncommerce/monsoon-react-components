import React from 'react';
import renderer from 'react-test-renderer';

import Input from './Input';

test('dafault modal snapshot', () => {
  const snapshot = renderer.create(
    <Input
      open={true}
    >
      <div> foo </div>
      <div> bar </div>
    </Input>
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});