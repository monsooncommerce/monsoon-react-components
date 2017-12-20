import React from 'react';
import renderer from 'react-test-renderer';

import ImagePlaceholder from '../ImagePlaceholder';

test('When all props are valid', () => {
  const snapshot = renderer.create(
    <ImagePlaceholder />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});
