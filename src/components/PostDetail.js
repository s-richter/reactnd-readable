import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
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
        const { dispatch, postId, post } = this.props
        if (!post) {
            dispatch(fetchPostById(postId))
        }
        dispatch(fetchComments(postId))
    }

    sortComments(sortMethod) {
        const { dispatch, comments } = this.props
        if (comments && comments.length > 0) {
            dispatch(updateCommentSortMethod(sortMethod))
        }
    }

    render() {
        const { isFetching, failedToLoadPost, comments, post } = this.props
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
                                // isFetching
                                //     ? <div style={{ margin: '15px' }}>Loading post...</div>
                                //     : (
                                //         failedToLoadPost
                                //             ? post
                                //                 ? <div style={{ margin: '15px' }}>
                                //                     There was an error loading the post.
                                //                      </div>
                                //                 : <Redirect to="/" />
                                //             : post.deleted
                                //                 ? <Redirect to="/" />
                                //                 : <Post post={post} />
                                //     )
                                isFetching
                                    ? <div style={{ margin: '15px' }}>Loading post...</div>
                                    : (
                                        failedToLoadPost
                                            ? <div style={{ margin: '15px' }}>
                                                There was an error loading the post.
                                                 </div>

                                            : post.deleted
                                                ? <Redirect to="/" />
                                                : <Post post={post} />
                                    )
                            }
                        </div>
                    </div>

                    {/* the header for the list of comments */}
                    <div className="list-of-comments-header">

                        <div className="list-of-comments-title">
                            <h2>Comments</h2>
                        </div>

                        {/* sorting */}
                        <SortBy
                            itemType="comment"
                            onChange={(sortMethod) => this.sortComments(sortMethod)} />

                        {/* add a new comment */}
                        <div className="list-of-comments-new-comment">
                            <NewComment
                                postId={
                                    post
                                        ? post.id
                                        : "0"
                                }
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
                        {/* <div className="list-of-comments-counter">
                            Total: {comments.length} comments
                        </div> */}
                        <div className="list-of-comments-counter">
                            Total: {
                                comments
                                    .filter(comment => comment.deleted === false)
                                    .length
                            } comments
                        </div>

                        {/* add new comment */}
                        <div className="list-of-comments-new-comment">
                            <NewComment
                                postId={
                                    post
                                        ? post.id
                                        : "0"
                                }
                                size={25} />
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps({ posts, comments }, ownProps) {
    const { items } = posts
    if (Object.keys(items).length === 0) {
        return {
            isFetching: posts.isFetching,
            posts,
            comments: [],
            failedToLoadPost: true
        }
    }

    const post = items[ownProps.postId]
    const { sortMethod, sortDirection, items: commentItems } = comments
    const sortingMethod = util.GetSortMethodByCriteria(sortMethod, sortDirection)
    const filteredItems = Object.keys(commentItems)
        .filter(key => commentItems[key].deleted === false)
        .reduce((obj, key) => {
            obj[key] = commentItems[key];
            return obj
        }, {})
    const sortedItems =
        Object.keys(filteredItems)
            .map(key => filteredItems[key])
            .sort(sortingMethod)
    return {
        isFetching: posts.isFetching,
        post,
        comments: sortedItems,
        failedToLoadPost: false
    }
}

export default connect(mapStateToProps)(PostDetail)