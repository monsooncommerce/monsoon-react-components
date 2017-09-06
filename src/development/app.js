import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../components/Input';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1> EOA Component Library </h1>
        <Input />
      </div>
    )
  }
}

export default App;
