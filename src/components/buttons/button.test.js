import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from "enzyme";

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

describe('Button Component Should', () => {

  test('render default if no type is specified', () => {
    const wrapper = shallow(<Button label="I am Button"/>);

    expect(wrapper.find('.default-button').length).toEqual(1);
  });

  test('render icon class if type is icon', () => {
    const wrapper = shallow(<Button icon="growth" type="icon"/>);

    expect(wrapper.find('.icon-button').length).toEqual(1);
  });
});
