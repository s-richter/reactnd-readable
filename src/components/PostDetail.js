import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import Post from './Post'
import Comment from './Comment'
import NewComment from './NewComment'
import NavigateBack from './NavigateBack'
import { fetchPostById, fetchComments } from '../actions'

class PostDetail extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    componentDidMount() {
        const { dispatch, postId } = this.props
        dispatch(fetchPostById(postId))
        dispatch(fetchComments(postId))
    }

    render() {
        const { isFetching, failedToLoadPost, comments } = this.props
        return (
            <Row className="post-detail">
                <Col sm="12">
                    <div className="post-detail-container">
                        <div className="post-detail-navigate-back">
                            <NavigateBack />
                        </div>
                        {/* the post */}
                        <div className="post-detail-post">
                            {
                                failedToLoadPost
                                    ? <div style={{ margin: '15px' }}>
                                        There was an error loading the post.
                                    </div>
                                    : isFetching
                                        ? <div style={{ margin: '15px' }}>Loading post...</div>
                                        : <Post post={this.props.post} />
                            }
                        </div>
                    </div>

                    {/* the header for the list of comments */}
                    <div className="list-of-comments-header">

                        <div className="list-of-comments-title">
                            <h2>Comments</h2>
                        </div>

                        {/* sorting */}
                        <div className="list-of-comments-sort-by">
                            <span className="list-of-comments-sort-by-label">Sort by: </span>
                            <select
                                name="list-of-comments-sort-by-select"
                                id="list-of-comments-sort-by-select"
                            >
                                <option value="voteScore">votes</option>
                                <option value="timestamp">timestamp</option>
                                <option value="numberOfComments">comments</option>
                            </select>
                        </div>

                        {/* add a new comment */}
                        <div className="list-of-comments-new-comment">
                            <NewComment
                                size={25} />
                        </div>
                    </div>

                    {/* the comments */}
                    <div className="list-of-comments">
                        {
                            comments.length > 0
                                ? comments.map(comment => (
                                    <Comment
                                        key={comment.id}
                                        comment={comment} />
                                ))
                                : <div style={{ margin: '10px' }}>
                                    This post does not have any comments yet. Be the first to comment!
                                </div>
                        }
                    </div>

                    {/* footer */}
                    <div className="list-of-comments-footer">

                        {/* comment counter */}
                        <div className="list-of-comments-counter">
                            Total: {comments.length} comments
                    </div>

                        {/* add new comment */}
                        <div className="list-of-comments-new-comment">
                            <NewComment />
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps({ posts, comments }, ownProps) {
    const post = posts.items.find(p => p.id === ownProps.postId)
    const { items: commentItems } = comments
    if (post) {
        return {
            post,
            comments: commentItems
        }
    } else {
        // this page was called when the store was empty or the post could not be found - search for it
        return {
            isFetching: true,
            failedToLoadPost: true,
            comments: commentItems
        }
    }
}

export default connect(mapStateToProps)(PostDetail)