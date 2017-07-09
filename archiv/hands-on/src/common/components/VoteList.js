import React from 'react'
import PropTypes from 'prop-types'
import VoteSummary from './VoteSummary'
import VotingComponent from './VotingComponent'

export default function VoteList({ allVotes, currentVoteId}) {
  return (
    <div>
      {allVotes.map((vote) => {
        if (vote.id === currentVoteId) {
          return <VotingComponent key={vote.id}
                                  vote={vote}
          />
        }
        return <VoteSummary key={vote.id} vote={vote}/>
      })}
    </div>
  )
}

VoteList.propTypes = {
  allVotes:       PropTypes.array.isRequired,
  currentVoteId:  PropTypes.string
}