import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as uuid from 'uuid'
import NewMessage from 'react-icons/lib/fa/envelope-o'
import EditPostForm from './EditPostForm'
import { saveNewPost } from '../actions'

class NewPost extends Component {
    state = {
        modal: false
    }

    initialize = () => {
        // this component will be rendered before the calls to the server api have returned the
        //  list of categories. One possibility would be to use e.g. componentWillReceiveProps()
        //  and check every time the function is called. Instead, a cheat is used here: the
        //  colors associated with the categories are part of the initial state of the store
        //  (hard coded), and the keys are therefore available right from the start
        const category =
            this.props.categoryColors
            ? Object.keys(this.props.categoryColors)[0]
            : ""
        this.post = {
            id: this.getNewGuid(),
            timestamp: Date.now(),
            title: "",
            body: "",
            author: "",
            category: category,
            voteScore: 1,
            deleted: false,
            commentCount: 0
        }
    }

    componentWillMount() {
        this.initialize()
    }

    getNewGuid() {
        return uuid.v4()
    }

    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    onSaveChanges = (values) => {
        this.props.saveNewPost(
            this.post.id,
            {
                ...this.post,
                ...values
            })
        // once a post has been saved, the post fields are reset
        this.initialize()
    }

    render() {
        return (
            <div>
                <div
                    className="new-post"
                    tooltip="Add a new post"
                    flow="left"
                    onClick={() => this.toggleModal()}
                >
                    <span className="new-comment-plus">+ </span>
                    <NewMessage size={25} />
                </div>
                <EditPostForm
                    isVisible={this.state.modal}
                    toggleModal={this.toggleModal}
                    saveChanges={this.onSaveChanges}
                    post={this.post}
                    isNewPost={true}
                />
            </div>
        )
    }
}

function mapStateToProps({ categories}) {
    return {
        categoryColors: categories.categoryColors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveNewPost: (postId, values) => {
            dispatch(saveNewPost(postId, values))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
