import React from 'react';




class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  getSteps(root, manifest) {

    console.log(root, manifest)

    return root.steps.map( steps => {
      console.log(manifest[steps].name)
    })

  }

  render() {
    const root = this.props.rootSet;
    const title = this.props.rootSet.name;
    const manifest = this.props.manifest;
    const steps = this.getSteps(root, manifest)
    return (
      <div className="card">
        { title }
      </div>
    )
  }
}

export default Card;
