import React from 'react';
import DevSection from './DisplaySection.dev';
import MarkdownRenderer from 'react-markdown-renderer';
import instuctions from './home.md';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <div>
        </div>
        <MarkdownRenderer markdown={instuctions} />
      </div>
    );
  }
}

export default Home;
