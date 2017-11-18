import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SortBy from '../shared/SortBy'
import NewComment from '../comments/NewComment'
import Comment from '../comments/Comment'
import * as util from '../../util'
import { fetchComments, updateCommentSortMethod } from '../../actions'

// the list of comments of a post
class ListOfComments extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    componentDidMount() {
        const { dispatch, postId } = this.props
        dispatch(fetchComments(postId))
    }

    sortComments(sortMethod) {
        const { dispatch, comments } = this.props
        if (comments && comments.length > 0) {
            dispatch(updateCommentSortMethod(sortMethod))
        }
    }

    render() {
        const { comments, postId } = this.props

        return (
            <div>
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
                            postId={postId}
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
                        Total: {
                            comments
                                .filter(comment => comment.deleted === false)
                                .length
                        } comments
                        </div>

                    {/* add new comment */}
                    <div className="list-of-comments-new-comment">
                        <NewComment
                            postId={postId}
                            size={25} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ comments }, ownProps) {
    const { sortMethod, sortDirection, items: commentItems } = comments
    const sortingMethod = util.GetSortMethodByCriteria(sortMethod, sortDirection)
    // as with the posts, the comments have to be filtered and sorted. And as with the posts,
    //  sortDirection is not used right now, but the UI could be easily changed to support it
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
        comments: sortedItems
    }
}

export default connect(mapStateToProps)(ListOfComments)