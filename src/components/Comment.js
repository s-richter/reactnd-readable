import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NoImage from 'react-icons/lib/fa/image'
import EditItemButton from './EditItemButton'
import DeleteItemButton from './DeleteItemButton'
import DisplayCount from './DisplayCount'
import VoteChanger from './VoteChanger'
import EditCommentForm from './EditCommentForm'
import { applyVoteToComment, saveChangesToComment } from '../actions'
import { VOTEDIRECTION } from '../util'

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.shape({
            id: PropTypes.string.isRequired,
            parentId: PropTypes.string.isRequired,
            timestamp: PropTypes.number.isRequired,
            body: PropTypes.string,
            author: PropTypes.string.isRequired,
            voteScore: PropTypes.number.isRequired,
            deleted: PropTypes.bool,
            parentDeleted: PropTypes.bool
        })
    }

    state = {
        modal: false
    }

    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    onSaveChanges = (values) => {
        this.props.saveChangesToComment(this.props.comment.id, values)
    }

    onDelete = () => {
        // TODO: mark comment as deleted
        console.log("comment " + this.props.comment.id + " deleted!")
    }

    onVoteUp = () => {
        this.props.applyVoteToComment(this.props.comment.id, VOTEDIRECTION.UP)
    }

    onVoteDown = () => {
        this.props.applyVoteToComment(this.props.comment.id, VOTEDIRECTION.DOWN)
    }

    render() {
        const { comment } = this.props
        return (
            <div className="comment-container">
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
                            </div>
                            <div className="comment-author">
                                written by {comment.author} @ {new Date(comment.timestamp).toLocaleString()}
                            </div>
                        </div>

                        {/* controls to edit and delete the comment */}
                        <div className="comment-edit-delete">
                            <EditItemButton
                                itemName="comment"
                                onEdit={this.toggleModal} />
                            <DeleteItemButton
                                itemName="comment"
                                onDelete={this.onDelete} />
                        </div>

                        {/* statistics for the comment and controls to vote */}
                        <div className="comment-stats">
                            {/* number of votes and controls to vote the comment up or down */}
                            <div className="comment-score">
                                <DisplayCount
                                    number={comment.voteScore}
                                    colorize={true}
                                />
                                <VoteChanger
                                    countedName="comment"
                                    onVoteUp={this.onVoteUp}
                                    onVoteDown={this.onVoteDown}
                                />
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

                {/* the modal dialog to edit the comment */}
                <EditCommentForm
                    isVisible={this.state.modal}
                    toggleModal={this.toggleModal}
                    saveChanges={this.onSaveChanges}
                    comment={this.props.comment}
                />
            </div>
        )
    }
}

function mapStateToProps({ comments }, ownProps) {
    const { items } = comments
    const comment = items[ownProps.comment.id]
    return {
        comment
    }
}

function mapDispatchToProps(dispatch) {
    return {
        applyVoteToComment: (commentId, voteDirection) => {
            dispatch(applyVoteToComment(commentId, voteDirection))
        },
        saveChangesToComment: (commentId, values) => {
            dispatch(saveChangesToComment(commentId, values))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)