import React from 'react'
import VoteList from '../components/VoteList'
import VoteComposer from '../components/VoteComposer'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class VotePage extends React.Component {
  
  componentDidMount() {
    this.props.loadVotes();
  }

  // componentWillMount() {
  //   if (typeof document !== 'undefined') document.title = 'Overview - Vote as a Service';
  //   if (votesCache.votes) {
  //     this.setState({allVotes: votesCache.votes})
  //     // just use the data from server passed via initial state for initial rendering to be always up to date
  //     votesCache.reset()
  //   }else if (this.props.staticContext && this.props.staticContext.initialData) {
  //     this.setState({allVotes: this.props.staticContext.initialData.votes})
  //     // just use the data from server passed by the router
  //     this.props.staticContext.initialData = null
  //   } else {
  //     fetchJson('/api/votes').then(votes => {
  //       this.setState({allVotes: votes})
  //     })
  //   }
  // }

  render() {
    const { votes } = this.props
    this.props.setTitle('Overview - Vote as a Service')

    return (
      <div>
        <VoteList allVotes={votes} />
        <Link to="/compose">
          <VoteComposer active={false} />
        </Link> 
      </div> 
      
    ) 

  }
}

VotePage.propTypes = {
  votes: PropTypes.array.isRequired,
  setTitle: PropTypes.func.isRequired,
  loadVotes: PropTypes.func.isRequired
};

import * as Actions from '../actions';

function mapStateToProps(state) {
  return {
    votes: state.votes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VotePage))