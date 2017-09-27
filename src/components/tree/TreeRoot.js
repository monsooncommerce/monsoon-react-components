import React from 'react';
import Node from './Node';

class TreeRoot extends React.Component {
  constructor(props) {
    super(props)
  }

  getSteps(root, manifest) {

    console.log(root, manifest)

    return root.nodes.map( nodeKey => {
      const node = manifest[nodeKey]
      return <Node key={node._id} node={node} manifest={manifest} level={1} />
    })

  }

  render() {
    const root = this.props.rootSet;
    const title = this.props.rootSet.name;
    const manifest = this.props.manifest;
    const node = this.getSteps(root, manifest)
    return (
      <div className="card">
        { title }
        { node }
      </div>
    )
  }
}

export default TreeRoot;
