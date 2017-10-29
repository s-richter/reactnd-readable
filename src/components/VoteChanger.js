import React, { Component } from 'react'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'
import PropTypes from 'prop-types'

export default class VoteChanger extends Component {
    static propTypes = {
        countedName: PropTypes.string.isRequired
    }

    render() {
        const voteUp = `Vote up this ${this.props.countedName}`
        const voteDown = `Vote down this ${this.props.countedName}`
        return (
            <div className="vote-counter">
                <div
                    className="vote-counter-vote-up"
                    tooltip={voteUp}
                    flow="left"
                >
                    <ThumbsUp
                        size={20}
                        color='green' />
                </div>
                <div
                    className="vote-counter-vote-down"
                    tooltip={voteDown}
                    flow="left"
                >
                    <ThumbsDown
                        size={20}
                        color='red' />
                </div>
            </div>
        )
    }
}
