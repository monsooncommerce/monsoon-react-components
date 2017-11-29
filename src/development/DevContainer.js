import React from 'react';
import { Link, Route } from 'react-router-dom';
import devComponents from './devComponents';

class DevContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/buttons">Buttons</Link></li>
            <li><Link to="/icon">Icons</Link></li>
          </ul>
        </div>

        <div>
          <Route exact path="/" component={devComponents.Home}/>
          <Route path="/buttons" component={devComponents.Buttons}/>
          <Route path="/icon" component={devComponents.Icon}/>
        </div>
      </div>

    );
  }
}

export default DevContainer;
