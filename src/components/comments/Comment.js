import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EditItemButton from '../edit/EditItemButton'
import DeleteItemButton from '../shared/DeleteItemButton'
import DisplayCount from '../shared/DisplayCount'
import VoteChanger from '../shared/VoteChanger'
import EditCommentForm from '../edit/EditCommentForm'
import {
    applyVoteToComment,
    saveChangesToComment,
    deleteComment,
    updateCommentCount
} from '../../actions'
import { VOTEDIRECTION } from '../../util'

// a single comment
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

    // local state for showing and hiding a modal dialog to edit the comment
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
        const { deleteComment, updateCommentCount, comment } = this.props
        deleteComment(comment.id)
        updateCommentCount(comment.parentId, -1)
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
                    <div className="comment-info-content">
                        <div className="comment-info">
                            <div className="comment-author">
                                last edited by {comment.author} @ {new Date(comment.timestamp).toLocaleString()}
                            </div>
                        </div>
                        <div className="comment-content">
                            {/* The actual content (message) of the comment */}
                            <div className="comment-body">
                                {comment.body}
                            </div>
                        </div>
                    </div>
                    <div className="comment-update-stats">
                        {/* controls to edit and delete the comment */}
                        <div className="comment-edit-delete">
                            <EditItemButton
                                itemName="comment"
                                onEdit={this.toggleModal} />
                            <DeleteItemButton
                                itemName="comment"
                                onDelete={this.onDelete} />
                        </div>
                        <div className="comment-stats">
                            {/* number of votes and controls to vote the post up or down */}
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
                </div>

                {/* the modal dialog to edit the comment */}
                <EditCommentForm
                    isVisible={this.state.modal}
                    toggleModal={this.toggleModal}
                    saveChanges={this.onSaveChanges}
                    comment={this.props.comment}
                    isNewComment={false}
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
        },
        deleteComment: (commentId) => {
            dispatch(deleteComment(commentId))
        },
        updateCommentCount: (postId, amount) => {
            dispatch(updateCommentCount(postId, amount))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)