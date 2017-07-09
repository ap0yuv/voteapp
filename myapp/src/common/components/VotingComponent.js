import React from 'react';
import PropTypes from 'prop-types'
import ChoiceBar from './ChoiceBar'

export default function VotingComponent({ vote, onDismissVote, onRegisterChoice }) {
  //const totalVotes = vote.choices.reduce((prev, curr) => prev + curr.count, 0)

  return (
    <div className="Row VotingRow Spacer">
      <div className="Head" onClick={onDismissVote}>
        <h1 className="Title">{vote.title}
          <div className="Badge">{vote.totalVotes} Votes</div>
        </h1>
        <div className="Description Emphasis">{vote.description}</div>
      </div>
      <div>
        {vote.choices.map((choice) =>
            <ChoiceBar key={choice.id}
                     onClickHandler={()=>onRegisterChoice(choice)}
            {...choice} />
        )}
      </div>
      <div className="ButtonBar">
        <div className="Button" onClick={onDismissVote}>Vote later</div>
      </div>
    </div>
  )
}

VotingComponent.propTypes = {
  vote:             PropTypes.object.isRequired,
  onDismissVote:    PropTypes.func.isRequired,
  onRegisterChoice: PropTypes.func.isRequired
}
