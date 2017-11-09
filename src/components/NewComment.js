import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as uuid from 'uuid'
import PropTypes from 'prop-types'
import CommentIcon from 'react-icons/lib/fa/comment-o'
import EditCommentForm from './EditCommentForm'
import { saveNewComment } from '../actions'

class NewComment extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    state = {
        modal: false
    }

    initialize = () => {
        this.comment = {
            id: this.getNewGuid(),
            parentId: this.props.postId,
            timestamp: Date.now(),
            body: "",
            author: "",
            voteScore: 0,   // for some reason, the server will return this as 1!
            deleted: false,
            parentDeleted: false
        }
    }

    componentWillMount() {
        this.initialize()
    }

    componentWillReceiveProps(nextProps) {
        // the post id might have changed
        this.comment.parentId = nextProps.postId
    }

    getNewGuid() {
        return uuid.v4()
    }

    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    onSaveChanges = (values) => {
        this.props.saveNewComment(
            this.comment.id,
            {
                ...this.comment,
                ...values
            })
        // once a comment has been saved, the comment fields are reset
        this.initialize()
    }

    render() {
        return (
            <div>
                <div
                    className="new-comment"
                    tooltip="Add a new comment"
                    flow="left"
                    onClick={() => this.toggleModal()}
                >
                    <span className="new-comment-plus">+ </span>
                    <CommentIcon size={25} />
                </div>
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
        saveNewComment: (commentId, values) => {
            dispatch(saveNewComment(commentId, values))
        }
    }
}

export default connect(null, mapDispatchToProps)(NewComment)