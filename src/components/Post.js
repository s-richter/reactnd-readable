import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import NoImage from 'react-icons/lib/fa/image'
import EditItemButton from './EditItemButton'
import DeleteItemButton from './DeleteItemButton'
import DisplayCount from './DisplayCount'
import CommentIcon from 'react-icons/lib/fa/comment-o'
import VoteChanger from './VoteChanger'
import EditPostForm from './EditPostForm'
import History from './History'
import { applyVoteToPost, saveChangesToPost, deletePost } from '../actions'
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

    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    onSaveChanges = (values) => {
        this.props.saveChangesToPost(this.props.post.id, values)
    }

    onDelete = () => {
        this.props.deletePost(this.props.post.id)

    }

    onVoteUp = () => {
        this.props.applyVoteToPost(this.props.post.id, VOTEDIRECTION.UP)
    }

    onVoteDown = () => {
        this.props.applyVoteToPost(this.props.post.id, VOTEDIRECTION.DOWN)
    }

    render() {
        const { post, categoryColors } = this.props
        const showDetails = History.location.pathname.includes("/posts/")
        const link = `/posts/${post.id}`
        return (
            <div className="post-container">
                <div className="post">

                    {/* general information about the post and controls to manipulate it */}
                    <div className="post-header">

                        {/* image of the author or picture for the post. Can be hidden */}
                        {/* <div className="post-image">
                            <NoImage
                                size={35}
                                color='lightgrey' />
                        </div> */}

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
                                last edited by {post.author} @ {new Date(post.timestamp).toLocaleString()}
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
                                        color: `${categoryColors[post.category]}`
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
                                onDelete={this.onDelete} />
                        </div>

                        {/* statistics for the post and controls to comment and vote */}
                        <div className="post-stats">
                            {/* number of comments and button to add a new comment*/}
                            <div className="post-comments">
                                <DisplayCount
                                    number={post.commentCount}
                                />
                                <div className="post-comment-icon">
                                    <div>
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
                <EditPostForm
                    isVisible={this.state.modal}
                    toggleModal={this.toggleModal}
                    saveChanges={this.onSaveChanges}
                    post={this.props.post}
                    isNewPost={false}
                />
            </div>
        )
    }
}

function mapStateToProps({ posts, categories, comments }, ownProps) {
    const { items } = posts
    const post = items[ownProps.post.id]
    return {
        post,
        categoryColors: categories.categoryColors,
        comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        applyVoteToPost: (postId, voteDirection) => {
            dispatch(applyVoteToPost(postId, voteDirection))
        },
        saveChangesToPost: (postId, values) => {
            dispatch(saveChangesToPost(postId, values))
        },
        deletePost: postId => {
            dispatch(deletePost(postId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)