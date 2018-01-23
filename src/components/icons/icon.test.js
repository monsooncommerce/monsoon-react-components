import React from 'react';
import renderer from 'react-test-renderer';

import Icon from '../icons/Icon';

test('stream icon', () => {
  const snapshot = renderer.create(
    <Icon type="stream"  />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

test('orders icon', () => {
  const snapshot = renderer.create(
    <Icon type="orders"  />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

test('watchlist icon', () => {
  const snapshot = renderer.create(
    <Icon type="watchlist"  />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

test('inventory icon', () => {
  const snapshot = renderer.create(
    <Icon type="inventory"  />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

test('trends icon', () => {
  const snapshot = renderer.create(
    <Icon type="trends"  />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

test('profit icon', () => {
  const snapshot = renderer.create(
    <Icon type="profit"  />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

test('settings icon', () => {
  const snapshot = renderer.create(
    <Icon type="settings"  />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

test('dashboard icon', () => {
  const snapshot = renderer.create(
    <Icon type="dashboard"  />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

test('user icon', () => {
  const snapshot = renderer.create(
    <Icon type="user"  />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

test('trash icon', () => {
  const snapshot = renderer.create(
    <Icon type="trash"  />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

test('submit icon', () => {
  const snapshot = renderer.create(
    <Icon type="submit"  />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

test('ellipsis icon', () => {
  const snapshot = renderer.create(
    <Icon type="ellipsis"  />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});

test('download icon', () => {
  const snapshot = renderer.create(
    <Icon type="download"  />
  ).toJSON();

  expect(snapshot).toMatchSnapshot();
});
