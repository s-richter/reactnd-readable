import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import NoImage from 'react-icons/lib/fa/image'
import EditItemButton from './EditItemButton'
import DeleteItemButton from './DeleteItemButton'
import DisplayCount from './DisplayCount'
import CommentIcon from 'react-icons/lib/fa/comment-o'
import VoteChanger from './VoteChanger'
import History from './History'
import EditItemInput from './EditItemInput'
import EditItemSelect from './EditItemSelect'
import EditItemTextArea from './EditItemTextArea'
import EditItemModalFooter from './EditItemModalFooter'
import { applyVoteToPost } from '../actions'
import { VOTEDIRECTION } from '../util'

class Post extends Component {
    static propTypes = {
        post: PropTypes.shape({
            id: PropTypes.string.isRequired,
            timestamp: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string,
            author: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            voteScore: PropTypes.number.isRequired,
            deleted: PropTypes.bool,
            commentCount: PropTypes.number.isRequired
        })
    }

    state = {
        modal: false
    }

    constructor() {
        super()

        this.modalRequested = false;
        // TODO: get category colors from store
        this.categoryColors = {
            "react": "#00d8ff",
            "redux": "#764ABC",
            "udacity": "#06ADDB"
        }
    }

    saveChanges = (field, value) => {
        // TODO: save changes in store
        console.log("changes to post saved!")
        this.toggleModal()
    }

    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    deletePost = () => {
        // TODO: mark post as deleted
        console.log("post " + this.props.post.id + " deleted!")
        // TODO: for all the comments: set the propery parentDeleted to true        
    }

    onVoteUp = () => {
        this.props.dispatch(applyVoteToPost(this.props.post.id, VOTEDIRECTION.UP))
    }

    onVoteDown = () => {
        this.props.dispatch(applyVoteToPost(this.props.post.id, VOTEDIRECTION.DOWN))
    }

    render() {
        const { post } = this.props
        const showDetails = History.location.pathname.includes("/posts/")
        const link = `/posts/${post.id}`
        return (
            <div className="post-container">
                <div className="post">

                    {/* general information about the post and controls to manipulate it */}
                    <div className="post-header">

                        {/* image of the author or picture for the post. Can be hidden */}
                        <div className="post-image">
                            <NoImage
                                size={35}
                                color='lightgrey' />
                        </div>

                        {/* information about the author and last edit date */}
                        <div className="post-info">
                            <div className="post-title-category">
                                {
                                    showDetails
                                        ? <h4>{post.title}</h4>
                                        : <Link to={link}><h4>{post.title}</h4></Link>
                                }
                            </div>
                            <div className="post-author">
                                written by {post.author} @ {new Date(post.timestamp).toLocaleString()}
                            </div>
                            <div className="post-category">
                                {
                                    showDetails
                                        ? <span className="post-category-label">Category: </span>
                                        : ""
                                }
                                <span
                                    className="post-category-name"
                                    style={{
                                        color: `${this.categoryColors[post.category]}`
                                    }}
                                >
                                    {post.category}
                                </span>
                            </div>
                        </div>

                        {/* controls to edit and delete the post */}
                        <div className="post-edit-delete">
                            <EditItemButton
                                itemName="post"
                                onEdit={this.toggleModal} />
                            <DeleteItemButton
                                itemName="post"
                                onDelete={this.deletePost} />
                        </div>

                        {/* statistics for the post and controls to comment and vote */}
                        <div className="post-stats">
                            {/* number of comments and button to add a new comment*/}
                            <div className="post-comments">
                                <DisplayCount
                                    number={post.commentCount}
                                />
                                <div className="post-comment-icon">
                                    <div
                                        tooltip="Add a comment"
                                        flow="left"
                                    >
                                        <CommentIcon size={20} />
                                    </div>
                                </div>
                            </div>
                            {/* number of votes and controls to vote the post up or down */}
                            <div className="post-score">
                                <DisplayCount
                                    number={post.voteScore}
                                    colorize={true}
                                />
                                <VoteChanger
                                    countedName="post"
                                    onVoteUp={() => this.onVoteUp()}
                                    onVoteDown={() => this.onVoteDown()} />
                            </div>
                        </div>
                    </div>

                    {/* the actual content of the post */}
                    {
                        showDetails
                            ? <div className="post-content">
                                <div className="post-body">
                                    {post.body}
                                </div>
                            </div>
                            : ''
                    }
                </div>

                {/* the modal dialog to edit the post */}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                >
                    <ModalHeader toggle={this.toggleModal}>Edit Post</ModalHeader>
                    <ModalBody>
                        {/* title */}
                        <EditItemInput
                            label="Post Title"
                            value={post.title}
                            name="PostTitle"
                            onChange={() => console.log("The titel was changed")}
                        />

                        {/* author */}
                        <EditItemInput
                            label="Author"
                            value={post.author}
                            name="PostAuthor"
                            onChange={() => console.log("The author was changed")}
                        />

                        {/* category */}
                        <EditItemSelect
                            label="Category"
                            value={post.category}                            
                            name="PostCategory"
                            onChange={() => console.log("The category was changed")}
                        />

                        {/* message */}
                        <EditItemTextArea
                            label="Message"
                            value={post.body}                            
                            name="PostBody"
                            onChange={() => console.log("The message was changed")}
                        />
                    </ModalBody>
                    <EditItemModalFooter
                        saveChanges={this.saveChanges}
                        toggleModal={this.toggleModal} />
                </Modal>
            </div>
        )
    }
}

function mapStateToProps({ posts }, ownProps) {
    const { items } = posts
    const post = items[ownProps.post.id]
    return {
        post
    }
}

export default connect(mapStateToProps)(Post)