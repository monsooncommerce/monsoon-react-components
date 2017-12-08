import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

import Button from './Button';

test('Default Button', () => {
  const snapshot = renderer.create(
    <Button label='Hello Dolly'/>
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

test('Icon Button', () => {
  const snapshot = renderer.create(
    <Button type="icon" icon="growth"/>
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

describe('If no type is passed in the button should be default', () => {

  test('Load More Button is Rendered', () => {
    const wrapper = shallow(<Button label="I am Button"/>);

    expect(wrapper.find('.button').length).toEqual(1);
  });
});
