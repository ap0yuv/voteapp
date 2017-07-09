import React, { Component } from 'react'
import VotingComponent from './VotingComponent'
import {fetchJson, sendJson} from '../backend/Backend'

class SingleVoteController extends Component {

    constructor(props) {
        super(props)
        this.registerVote = this.registerVote.bind(this);
        this.routeToMain = this.routeToMain.bind(this);
        this.state = {
        vote: null
        }
  }
    componentWillReceiveProps(nextProps) {
        this.loadVote(nextProps);
    }

    componentDidMount() {
        this.loadVote(this.props);
        document.title = `Vote ${this.props.match.params.id} - Vote as a Service`;
    }

    loadVote(props) {
        const requestedVoteId = props.match.params.id
        if (!requestedVoteId || (this.state.vote && this.state.vote.id === requestedVoteId)) {
            return
        }
        fetchJson(`/api/votes/${requestedVoteId}`).then(vote => {
            document.title = `${vote.title} - Vote as a Service`
            this.setState({vote})
        })
    }

    registerVote(vote, choice) {
        sendJson('put', `/api/votes/${vote.id}/choices/${choice.id}/vote`, {}).then(()=>this.routeToMain())
    }

    routeToMain() {
        this.props.history.push('/')
    }

    render() {
        const {vote} = this.state
        if (vote) {
            return <VotingComponent vote={vote}
                        onDismissVote={this.routeToMain}
                        onRegisterChoice={(choice)=>{this.registerVote(vote, choice)}}
                    />
        } else {
            return null
        }
  }
}

// SingleVoteController.contextTypes = {
//   history: React.PropTypes.object.isRequired
// };

export default SingleVoteController;