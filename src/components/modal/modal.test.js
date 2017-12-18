import React from 'react';
import renderer from 'react-test-renderer';

import Modal from './Modal';

test('dafault modal snapshot', () => {
  const snapshot = renderer.create(
    <Modal
      open={true}
    >
      <div> foo </div>
      <div> bar </div>
    </Modal>
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});
