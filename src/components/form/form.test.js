import React from 'react';
import renderer from 'react-test-renderer';

import Form from './Form';

test('dafault modal snapshot', () => {
  const snapshot = renderer.create(
    <Form
      open={true}
    >
      <div> foo </div>
      <div> bar </div>
    </Form>
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});