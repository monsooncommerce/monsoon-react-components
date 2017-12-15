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
            <li><Link to="/loadingIndicator">LoadingIndicator</Link></li>
            <li><Link to="/table">Table</Link></li>
          </ul>
        </div>

        <div>
          <Route exact path="/" component={devComponents.Home}/>
          <Route path="/buttons" component={devComponents.ButtonsDev}/>
          <Route path="/icon" component={devComponents.IconDev}/>
          <Route path="/loadingIndicator" component={devComponents.LoadingIndicatorDev}/>
          <Route path="/table" component={devComponents.TableDev}/>
        </div>
      </div>

    );
  }
}

export default DevContainer;
