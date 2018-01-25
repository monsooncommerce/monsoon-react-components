import React from 'react';
import { Link, Route } from 'react-router-dom';
import devComponents from './devComponents';
import realComponents, { devComponents as foo} from '../components';

class DevContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getLinks() {
    return Object.keys(foo).map(key => {
      if ((!(key === 'DisplaySectionDev') && !(key === 'HomeDev'))) {
        return <div key={`${key}-link`} className='dev-container__link'><Link to={`/${key.toLowerCase()}`}>{key.replace('Dev','')}</Link></div>;
      }
    });
  }

  makeRoutes() {
    return Object.keys(foo).map(key => {
        return <Route key={`${key}-route`} exact path={`/${key}`} component={foo[`${key}`]}/>;
    });
  }

  render() {
    const sectionLinks = this.getLinks();
    const sectionRoutes = this.makeRoutes();
    return (
      <div className="dev-container">

        <div className="dev-container__sidebar">
          <div className='dev-container__link'><Link to={`/`}>Home</Link></div>
          {sectionLinks}
        </div>

        <div className="dev-container__display-view">
          <Route exact path={`/`} component={devComponents[`HomeDev`]} />
          {sectionRoutes}
        </div>

      </div>

    );
  }
}

export default DevContainer;
