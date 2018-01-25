import React from 'react';
import renderer from 'react-test-renderer';

import Card from './Card';

test('dafault modal snapshot', () => {
  const snapshot = renderer.create(
    <Card/>
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});