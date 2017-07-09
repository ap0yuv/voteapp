//@ts-check
import React, { Component } from 'react'
import PropTypes from 'prop-types'

function emptyChoice() {
    return {
        id:    `choice_${Date.now()}`,
        count: 0,
        title: null
    }
}

function emptyVote() {
    return {
        id:            '',
        title:         '',
        description:   '',
        formCompleted: false,
        choices:       [emptyChoice()]
    }
}

class VoteComposer extends Component {
    constructor(props) {
        super(props)
        this.activateIfNeeded = this.activateIfNeeded.bind(this)
        this.save = this.save.bind(this)
        this.close = this.close.bind(this)
        this.onChange = this.onChange.bind(this)
        
        this.state = {
            vote: emptyVote()
        }
    }    
    activateIfNeeded() {
        const {onActivate, active} = this.props
        if (!active) {
        onActivate()
        }
    }
    close() {
        const { onDeactivate } = this.props
        this.setState({vote: emptyVote()})
        onDeactivate()
    }
    save() {
        const { onSave } = this.props
        const { vote } = this.state
        const newVote = {
        ...vote,
        choices: vote.choices.slice(0, -1)
        }
        onSave(newVote)
        //this.close()
    }
    onChange(event) {
        const { name: fieldName, value: fieldValue } = event.target
        const { vote } = this.state

        const newVote = {
            ...vote,
            [fieldName]: fieldValue
        }

        this.setState({
            vote: newVote
        })
    }
    onChoiceChange(choiceIx, title) {
        const { vote } = this.state
        const choices = vote.choices
        const choice = choices[choiceIx]

        const newChoice = {
            ...choice,
            title
        }

        const newChoices = choices.map((c) => (c.id === choice.id ? newChoice : c))

        // add a new, empty choice field if we're currently in the last choice and the choice
        // has been new (empty) before. In other words: after entering the first character to the current last
        // choice add the field for the next choice
        if (!choice.title && newChoice.title && choiceIx === (choices.length - 1)) {
            newChoices.push(emptyChoice())
        }

        this.setState({
            vote: {
                ...vote,
                choices: newChoices
            }
        })
    }
    renderInactiveForm() {
        // {/*onClick={this.activateIfNeeded}*/}
        return (
        <div className="Row VotesRow Selectable">
            <h1 className="Title"><span className="Emphasis">What do <b>you</b> want to know ?</span>

            <div className="Badge">Add Voting</div>
            </h1>
            <p>Click here to leave your own question.</p>
        </div>
        )
    }
    isFormCompleted() {
        const {active} = this.props
        const { vote: { title, description, choices} } = this.state
        const choicesCount = choices.length
        let formCompleted = active && title && description && choicesCount > 1

        if (formCompleted) {
            formCompleted = choices.every((c, ix) => ix === choicesCount - 1 || c.title)
        }

        return formCompleted
    }
    renderActiveForm() {
        const { vote: { title, description, choices } } = this.state
        const formCompleted = this.isFormCompleted()

        return (
        <div className="Row VoteComposer Spacer">
            <div className="Head">
            <h1 className="Title">
                <input className="Title"
                    autoFocus
                    name="title"
                    type="text"
                    placeholder="What do you want to know ?"
                    value={title}
                    onChange={this.onChange}/>
            </h1>
            <input className="Description"
                    name="description"
                    type="text"
                    placeholder="Describe your question in one sentence here"
                    value={description}
                    onChange={this.onChange}/>
            </div>

            <div className="Body">
                {choices.map((c, ix) => {
                    const keyAndName = `choices_${ix}`
                    return (
                    <input className="Choice"
                            type="text"
                            key={keyAndName}
                            name={keyAndName}
                            placeholder={`Choice #${(ix + 1)}`}
                            onChange={(event)=>{this.onChoiceChange(ix, event.target.value)}}
                    />
                    )
                })}
            <div className="ButtonBar">
                <a className={formCompleted ? 'Button' : 'Button disabled'}
                   onClick={formCompleted ? this.save : null}>Save</a>
                <a className="Button" onClick={this.close}>Cancel</a>
            </div>
            </div>
        </div>
        )
    }
    render() {
        const {active} = this.props

        if (!active) {
        return this.renderInactiveForm()
        }

        return this.renderActiveForm()
    }
}

VoteComposer.propTypes = {
  active:        PropTypes.bool.isRequired,
  onSave:        PropTypes.func,
//   onActivate:    PropTypes.func,
  onDeactivate:  PropTypes.func
}

export default VoteComposer