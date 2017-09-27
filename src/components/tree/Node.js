import React from 'react';

class Node extends React.Component {
  constructor(props) {
    super(props)
  }

  getNodes(root, manifest, level) {

    if (root.nodes) {

      return root.nodes.map( nodeKey => {
        const node = manifest[nodeKey]
        return <Node key={node._id} node={node} manifest={manifest} level={level} />
      })
    }
  }

  render() {
    const node = this.props.node;
    const name = node.name;
    const manifest = this.props.manifest;
    const level = this.props.level + 1;
    const offset = `${level * 10}px`
    const nodes = this.getNodes(node, manifest, level);
    return (
      <div style={{ margin: '10px', marginLeft: offset }} className="card">
        { level }
        { name }
        { nodes }
      </div>
    )
  }
}

export default Node;
