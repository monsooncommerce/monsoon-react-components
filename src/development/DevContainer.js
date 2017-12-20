import React from 'react';
import { Link, Route } from 'react-router-dom';
import devComponents from './devComponents';

const sectionLinksData = [
  {
    path: '',
    label: 'Home',
  },
  {
    path: 'buttons',
    label: 'Buttons',
  },
  {
    path: 'icons',
    label: 'Icons',
  },
  {
    path: 'loadingIndicator',
    label: 'LoadingIndicator',
  },
  {
    path: 'table',
    label: 'Table',
  },
  {
    path: 'modal',
    label: 'Modal',
  },
  {
    path: 'placeholders',
    label: 'Placeholders',
  },
];

class DevContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getLinks(sectionLinks) {
    return sectionLinks.map(link => {
      return <div className='dev-container__link'><Link to={`/${link.path}`}>{link.label}</Link></div>;
    });
  }

  render() {
    const sectionLinks = this.getLinks(sectionLinksData);
    return (
      <div className="dev-container">
        <div className="dev-container__sidebar">
            {sectionLinks}
        </div>

        <div className="dev-container__display-view">
          <Route exact path="/" component={devComponents.Home}/>
          <Route path="/buttons" component={devComponents.ButtonsDev}/>
          <Route path="/icons" component={devComponents.IconDev}/>
          <Route path="/loadingIndicator" component={devComponents.LoadingIndicatorDev}/>
          <Route path="/table" component={devComponents.TableDev}/>
          <Route path="/modal" component={devComponents.ModalDev}/>
          <Route path="/placeholders" component={devComponents.PlaceholdersDev}/>
        </div>
      </div>

    );
  }
}

export default DevContainer;
