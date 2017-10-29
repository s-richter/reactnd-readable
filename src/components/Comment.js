import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NoImage from 'react-icons/lib/fa/image'
import EditItem from './EditItem'
import DeleteItem from './DeleteItem'
import DisplayCount from './DisplayCount'
import VoteChanger from './VoteChanger'

export default class Comment extends Component {
    static propTypes = {
        comment: PropTypes.shape({
            id: PropTypes.number.isRequired,
            postId: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            body: PropTypes.string,
            timestamp: PropTypes.timestamp,
            voteScore: PropTypes.number.isRequired,
            category: PropTypes.string.isRequired
        })
    }

    render() {
        const { comment } = this.props
        return (
            <div className="comment">
                <div className="comment-header">

                    {/* image of the author or picture for the comment. Can be hidden */}
                    <div className="comment-image">
                        <NoImage
                            size={35}
                            color='lightgrey' />
                    </div>

                    {/* information about the author and last edit date */}
                    <div className="comment-info">
                        <div className="comment-title-category">
                            <h4>{comment.title}</h4>
                            <span className="comment-category">({comment.category})</span>
                        </div>
                        <div className="comment-author">
                            written by {comment.author} @ {comment.timestamp}
                        </div>
                    </div>

                    {/* controls to edit and delete the comment */}
                    <div className="comment-edit-delete">
                        <EditItem itemName="comment" />
                        <DeleteItem itemName="comment" />
                    </div>

                    {/* statistics for the comment and controls to vote */}
                    <div className="comment-stats">
                        {/* number of votes and controls to vote the comment up or down */}
                        <div className="comment-score">
                            <DisplayCount
                                number={comment.voteScore}
                                colorize={true}
                            />
                            <VoteChanger countedName="comment" />
                        </div>
                    </div>
                </div>

                {/* the actual content of the comment */}
                {
                    <div className="comment-content">
                        <div className="comment-body">
                            {comment.body}
                        </div>
                    </div>
                }
            </div>
        )
    }
}
