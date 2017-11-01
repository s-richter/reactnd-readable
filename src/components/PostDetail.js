import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import Post from './Post'
import Comment from './Comment'
import NewComment from './NewComment'
import NavigateBack from './NavigateBack'
import SortBy from './SortBy'
import * as util from '../util'
import { fetchPostById, fetchComments, updateCommentSortMethod } from '../actions'

class PostDetail extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    componentDidMount() {
        const { dispatch, postId } = this.props
        dispatch(fetchPostById(postId))
        dispatch(fetchComments(postId))
    }

    sortComments(sortMethod) {
        const { dispatch, comments } = this.props
        if (comments.items && comments.items.length > 0) {
            dispatch(updateCommentSortMethod(sortMethod))
        }
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
                        {/* TODO: comments have not "sort by comment count" */}
                        <SortBy onChange={(sortMethod) => this.sortComments(sortMethod)} />

                        {/* add a new comment */}
                        <div className="list-of-comments-new-comment">
                            <NewComment
                                size={25} />
                        </div>
                    </div>

                    {/* the comments */}
                    <div className="list-of-comments">
                        {
                            comments.items.length > 0
                                ? comments.items.map(comment => (
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
    if (posts.items.length === 0) {
        return {
            posts,
            comments,
            failedToLoadPost: true
        }
    }
    const post = posts.items.find(p => p.id === ownProps.postId)
    const { sortMethod, sortDirection } = comments
    const sortingMethod = util.GetSortMethodByCriteria(sortMethod, sortDirection)
    comments.items.sort(sortingMethod)
    return {
        post,
        comments,
        failedToLoadPost: false
    }
}

export default connect(mapStateToProps)(PostDetail)