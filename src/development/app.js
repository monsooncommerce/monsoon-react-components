import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../components/Input';
import TreeRoot from '../components/tree';

const manifest = {

  8976: {
    _id: 9876,
    name: 'Day',
    type: 'set',
    details: 'Its the day',
    nodes: [1234, 2324, 3456]
  },

  1234: {
    _id: 1234,
    name: 'check calendar',
    type: 'step',
    details: 'do the thing',
  },

  4563: {
    _id: 4563,
    name: 'Cook Thoroughly',
    type: 'step',
    details: 'do the thing',
    nodes: [9087, 6785]
  },

  9087: {
    _id: 9087,
    name: 'Boil Water',
    type: 'step',
    details: 'do the thing',
  },

  6785: {
    _id: 6785,
    name: 'Add Tuffle Oil',
    type: 'step',
    details: 'do the thing',
  },

  124: {
    _id: 124,
    name: 'Skin Carefully',
    type: 'step',
    details: 'do the thing',
  },

  2324: {
    _id: 2324,
    name: 'Eat A Samurai',
    type: 'set',
    details: 'do the thing',
    nodes: [124, 4563]
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
        <TreeRoot rootSet={selected} manifest={manifest} />
      </div>
    )
  }
}

export default App;
