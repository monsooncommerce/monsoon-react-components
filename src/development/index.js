import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app';

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

const render = (app) => {

  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootNode
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    render(App);
  });
}
