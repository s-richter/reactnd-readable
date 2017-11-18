import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewMessage from 'react-icons/lib/fa/envelope-o'
import EditPostForm from '../edit/EditPostForm'
import { saveNewPost } from '../../actions'
import { getNewGuid } from '../../util'

// component to add a new post
class NewPost extends Component {
    state = {
        modal: false
    }

    reset = () => {
        // this component might be rendered before the calls to the server api have returned the
        //  list of categories. One possibility would be to use e.g. componentWillReceiveProps()
        //  and check every time the function is called. Instead, a cheat is used here: the
        //  colors associated with the categories are part of the initial state of the store
        //  (hard coded), and the keys are therefore available right from the start
        const category =
            this.props.categoryColors
            ? Object.keys(this.props.categoryColors)[0]
            : ""
        this.post = {
            id: getNewGuid(),
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
        this.reset()
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
        // once a post has been saved, the post fields are reset and ready for a new post
        this.reset()
    }

    render() {
        return (
            <div>
                {/* a clickable icon that shows the new post form */}
                <div
                    className="new-post"
                    tooltip="Add a new post"
                    flow="left"
                    onClick={() => this.toggleModal()}
                >
                    <span className="new-comment-plus">+ </span>
                    <NewMessage size={25} />
                </div>
                {/* the edit post form is reused here, as it has all the necessary 
                functionality */}
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
