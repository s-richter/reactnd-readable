import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CommentIcon from 'react-icons/lib/fa/comment-o'
import EditCommentForm from '../edit/EditCommentForm'
import { saveNewComment, updateCommentCount } from '../../actions'
import { getNewGuid } from '../../util'

// component to add a new comment
class NewComment extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    state = {
        modal: false
    }

    reset = () => {
        this.comment = {
            id: getNewGuid(),
            parentId: this.props.postId,
            timestamp: Date.now(),
            body: "",
            author: "",
            voteScore: 1,
            deleted: false,
            parentDeleted: false
        }
    }

    componentWillMount() {
        this.reset()
    }

    componentWillReceiveProps(nextProps) {
        // the post id might have changed, if another post is selected
        this.comment.parentId = nextProps.postId
    }

    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    onSaveChanges = (values) => {
        this.props.saveNewComment(
            this.comment.id,
            this.props.postId,
            {
                ...this.comment,
                ...values
            })
        // once a comment has been saved, the comment fields are reset and ready for a new comment
        this.reset()
    }

    render() {
        return (
            <div>
                {/* a clickable icon that shows the new comment form */}
                <div
                    className="new-comment"
                    tooltip="Add a new comment"
                    flow="left"
                    onClick={() => this.toggleModal()}
                >
                    <span className="new-comment-plus">+ </span>
                    <CommentIcon size={25} />
                </div>
                {/* the edit comment form is reused here, as it has all the necessary 
                functionality */}
                <EditCommentForm
                    isVisible={this.state.modal}
                    toggleModal={this.toggleModal}
                    saveChanges={this.onSaveChanges}
                    comment={this.comment}
                    isNewComment={true}
                />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveNewComment: (commentId, postId, values) => {
            dispatch(saveNewComment(commentId, values))
            dispatch(updateCommentCount(postId, 1))
        }
    }
}

export default connect(null, mapDispatchToProps)(NewComment)