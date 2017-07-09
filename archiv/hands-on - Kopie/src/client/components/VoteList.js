import React from 'react'
import PropTypes from 'prop-types'
import VoteSummary from './VoteSummary'
import VotingComponent from './VotingComponent'

export default function VoteList({ allVotes, currentVoteId, onSelectVote, onRegisterVote, onDismissVote }) {
  return (
    <div>
      {allVotes.map((vote) => {
        if (vote.id === currentVoteId) {
          return <VotingComponent key={vote.id}
                                  vote={vote}
                                  onDismissVote={()=>{onDismissVote(vote)}}
                                  onRegisterChoice={(choice)=>{onRegisterVote(vote, choice)}}
          />
        }
        return <VoteSummary key={vote.id} vote={vote} onActivate={()=>{onSelectVote(vote)}}/>
      })}
    </div>
  )
}

VoteList.propTypes = {
  allVotes:       PropTypes.array.isRequired,
  currentVoteId:  PropTypes.string,
  onSelectVote:   PropTypes.func.isRequired,
  onRegisterVote: PropTypes.func.isRequired,
  onDismissVote:  PropTypes.func.isRequired
}