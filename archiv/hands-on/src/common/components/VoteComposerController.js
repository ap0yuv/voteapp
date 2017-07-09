import React from 'react'
import VoteComposer from './VoteComposer'
import {sendJson} from '../backend/Backend'

export default class VoteComposerController extends React.Component {
  constructor(props) {
    super(props)
    this.routeToMain = this.routeToMain.bind(this)
    this.addVote = this.addVote.bind(this)
    // console.log(this.props)
  }

  componentDidMount() {
    document.title = 'Compose - Vote as a Service'
  }

  addVote(newVote) {
    sendJson('post', '/api/votes', newVote).then(()=>this.routeToMain())
  }

  transitionTo(path) {
    this.props.history.push(path)
  }

  routeToMain() {
    this.transitionTo('/')
  }

  render() {
    return (
      <VoteComposer
        active={true}
        onDeactivate={this.routeToMain}
        onSave={this.addVote}
      />
    )
  }
}
// VoteComposerController.contextTypes = {
//   history: React.PropTypes.object.isRequired
// }
