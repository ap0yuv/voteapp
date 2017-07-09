import React, { Component } from 'react' 
import VoteList from './VoteList'
import VoteComposer from './VoteComposer'
import PropTypes from 'prop-types'
import {fetchJSON, sendJson} from '../backend/Backend'

class VoteController extends Component {
    constructor(props) {
        super(props)
        this.state = {
           allVotes: [] //props.allVotes
        }

        //this.setCurrentVote = this.setCurrentVote.bind(this)        
        //this.registerVote = this.registerVote.bind(this)
        this.activateVoteComposer = this.activateVoteComposer.bind(this);
        //this.deactivateVoteComposer = this.deactivateVoteComposer.bind(this);
        //this.addVote = this.addVote.bind(this);
    }

    addVote(vote) {
        sendJson('post','/api/votes', vote)
            .then(respVote => 
                this.setState(
                    {
                        allVotes: [...this.state.allVotes, respVote]
                })
            )
    }

    setCurrentVote(vote) {
        const { composerActive } = this.state
        this.setState({currentVoteId: vote && !composerActive ? vote.id : null})
    }

    activateVoteComposer() {
        this.setState({
        currentVoteId:  null,
        composerActive: true
        })
    }

    deactivateVoteComposer() {
        this.setState({
        composerActive: false
        })
    }

    registerVote(vote, choice) {
        sendJson('put', `/api/votes/${vote.id}/choices/${choice.id}/vote`, {}).then(updatedVote => {
        // make sure our local copy contains refreshed version of the received vote
        const newAllVotes = this.state.allVotes.map(vote => vote.id === updatedVote.id ? updatedVote : vote);
        this.setState({allVotes: newAllVotes});

        // make sure received vote is also the current vote
        this.setCurrentVote(updatedVote);
    });
    }

    render() {
        const { allVotes, currentVoteId, composerActive } = this.state

        return (
            <div>
                <VoteList   allVotes={allVotes} 
                            currentVoteId={currentVoteId}
                            onSelectVote={this.setCurrentVote}
                            onDismissVote={()=>{this.setCurrentVote(null)}}
                            onRegisterVote={this.registerVote}
                />
                <VoteComposer active={composerActive}
                      onDeactivate={this.deactivateVoteComposer}
                      onActivate={this.activateVoteComposer}
                      onSave={this.addVote}/>
            </div>
        )
    }

    componentDidMount() {
        document.title = 'Overview - Vote as a Service'
        fetchJson('/api/votes').then(allVotes => {
            this.setState({
                allVotes
            })
        })
    }
    

}

// VoteController.propTypes = {
//         allVotes: PropTypes.array.isRequired
// }

export default VoteController