import React, { Component } from 'react'
import VotingComponent from '../components/VotingComponent'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push, replace } from 'react-router-redux'

class SingleVotePage extends Component {

//     constructor(props) {
//         super(props)
//         this.registerVote = this.registerVote.bind(this);
//         this.routeToMain = this.routeToMain.bind(this);
//         this.state = {
//         vote: null
//         }
//   }

    componentDidMount() {
        this.props.loadVote(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) {
       if (nextProps.match.params.id !== this.props.match.params.id) {
            this.props.loadVote(nextProps.match.params.id)
       }
    }

    // componentDidMount() {
    //     if (typeof document !== 'undefined') document.title = `Vote ${this.props.match.params.id} - Vote as a Service`
    //     if (votesCache.currentVote) {
    //         this.updateCurrentVote(votesCache.currentVote);
    //         // just use the data from server for initial rendering to be always up to date
    //         votesCache.reset();
    //     } else {
    //         this.loadVote(this.props);
    //     }
    // }

    // loadVote(props) {
    //     const requestedVoteId = props.match.params.id
    //     if (!requestedVoteId || (this.state.vote && this.state.vote.id === requestedVoteId)) {
    //         return
    //     }
    //     fetchJson(`/api/votes/${requestedVoteId}`).then(vote => {
    //         this.setState({vote})
    //     })
    // }

    // updateCurrentVote(vote) {
    //     if (typeof document !== 'undefined') document.title = `${vote.title} - Vote as a Service`;
    //         this.setState({
    //         vote
    //     })
    // }

    // registerVote(vote, choice) {
    //     sendJson('put', `/api/votes/${vote.id}/choices/${choice.id}/vote`, {}).then(()=>this.routeToMain())
    // }

    // routeToMain() {
    //     this.props.history.push('/')
    // }

    render() {
        const { currentVote, setTitle, dismissVote, registerVote } = this.props

        if (currentVote) {
            setTitle(`${currentVote.title} - Vote as a Service`);
            return <VotingComponent vote={currentVote}
                                    onDismissVote={()=>dismissVote()}
                                    onRegisterChoice={(choice)=>{registerVote(currentVote, choice)}}
            />
        } else {
            setTitle(`Vote ${this.props.match.params.id} - Vote as a Service`)
            return null
        }
  }
}

SingleVotePage.propTypes = {
  currentVote: PropTypes.object,
  setTitle: PropTypes.func.isRequired,
  dismissVote: PropTypes.func.isRequired,
  registerVote: PropTypes.func.isRequired,
  loadVote: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  })
}

import * as Actions from '../actions';

function mapStateToProps(state) {
  return {
    currentVote: state.currentVote
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SingleVotePage))
