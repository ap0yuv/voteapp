import React from 'react'
import PropTypes from 'prop-types'
import VoteComposer from './../components/VoteComposer'

function VoteComposerPage({setTitle, routeToMain, addVote, history}) {
  setTitle('Compose - Vote as a Service');
  return (
    <VoteComposer
      active={true}
      onDeactivate={() => routeToMain()}
      onSave={(vote)=>addVote(vote)}
    />
  );
}
VoteComposerPage.propTypes = {
  setTitle: PropTypes.func.isRequired,
  routeToMain: PropTypes.func.isRequired,
  addVote: PropTypes.func.isRequired
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

const VoteComposerConnected = connect(null,mapDispatchToProps)(VoteComposerPage)
export default VoteComposerConnected