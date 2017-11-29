import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import DevContainer from './DevContainer';
import devComponents from './devComponents';

import '../components/index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Router>
        <DevContainer/>
      </Router>
    );
  }
}

export default App;
