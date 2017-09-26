import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../components/Input';
import Card from '../components/Card';

const manifest = {

  8976: {
    _id: 9876,
    name: 'Day',
    type: 'set',
    details: 'Its the day',
    steps: [1234, 2324, 3456]
  },

  1234: {
    _id: 1234,
    name: 'check calendar',
    type: 'step',
    details: 'do the thing',
  },

  2324: {
    _id: 2324,
    name: 'Eat A Samurai',
    type: 'step',
    details: 'do the thing',
  },

  3456: {
    _id: 3456,
    name: 'Declare you love for Cheese',
    type: 'step',
    details: 'do the thing',
  },
}

const selected = manifest['8976'];



class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1> EOA Component Library </h1>
        <Input />
        <Card rootSet={selected} manifest={manifest} />
      </div>
    )
  }
}

export default App;
