import React, { Component } from 'react'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'
import PropTypes from 'prop-types'

// component that enables the user to vote posts and comments up and down
export default class VoteChanger extends Component {
    static propTypes = {
        countedName: PropTypes.string.isRequired,
        onVoteUp: PropTypes.func.isRequired,
        onVoteDown: PropTypes.func.isRequired
    }

    render() {
        const { countedName, onVoteUp, onVoteDown } = this.props
        const voteUp = `Vote up this ${countedName}`
        const voteDown = `Vote down this ${countedName}`
        return (
            <div className="vote-counter">
                <div
                    className="vote-counter-vote-up"
                    tooltip={voteUp}
                    flow="left"
                    onClick={() => onVoteUp()}
                >
                    <ThumbsUp
                        size={20}
                        color='green' />
                </div>
                <div
                    className="vote-counter-vote-down"
                    tooltip={voteDown}
                    flow="left"
                    onClick={() => onVoteDown()}
                >
                    <ThumbsDown
                        size={20}
                        color='red' />
                </div>
            </div>
        )
    }
}
