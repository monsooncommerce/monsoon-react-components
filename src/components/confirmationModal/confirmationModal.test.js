import React from 'react';
import renderer from 'react-test-renderer';

import ConfirmationModal from './ConfirmationModal';

test('Confirmation default snapshot', () => {
  const snapshot = renderer.create(
    <ConfirmationModal open={true}/>
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});
