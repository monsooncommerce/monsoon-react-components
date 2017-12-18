import React from 'react';
import DevSection from './DevSection';
import MarkdownRenderer from 'react-markdown-renderer';
import instuctions from './home.md';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(

      <div>
        <MarkdownRenderer markdown={instructions} />
      </div>

    );
  }
}

export default Home;
