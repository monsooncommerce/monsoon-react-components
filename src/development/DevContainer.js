import React from 'react';
import { Link, Route } from 'react-router-dom';
import devComponents from './devComponents';

import manifest from './helpers/componentManifest';

class DevContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getLinks(sectionLinks) {
    return Object.keys(devComponents).map(key => {
      if ((!(key === 'DisplaySectionDev') && !(key === 'HomeDev'))) {
        return <div className='dev-container__link'><Link to={`/${key.toLowerCase()}`}>{key.replace('Dev','')}</Link></div>;
      }
    });
  }

  makeRoutes(sectionLinks) {
    return Object.keys(devComponents).map(key => {
      return <Route exact path={`/${key}`} component={devComponents[`${key}`]}/>;
    });
  }

  render() {
    const sectionLinks = this.getLinks(manifest);
    const sectionRoutes = this.makeRoutes(manifest);
    return (
      <div className="dev-container">
        <div className="dev-container__sidebar">
            {sectionLinks}
        </div>

        <div className="dev-container__display-view">
          {sectionRoutes}
        </div>
      </div>

    );
  }
}

export default DevContainer;
