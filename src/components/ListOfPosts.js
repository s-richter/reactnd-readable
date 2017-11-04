import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Post from './Post'
import NewPost from './NewPost'
import NavigateBack from './NavigateBack'
import SortBy from './SortBy'
import * as util from '../util'
import { fetchPosts, fetchAllPosts, updatePostSortMethod } from '../actions'

class ListOfPosts extends Component {
    static propTypes = {
        category: PropTypes.string
    }

    componentDidMount() {
        const { dispatch, category } = this.props
        category
            ? dispatch(fetchPosts(category))
            : dispatch(fetchAllPosts())
    }

    sortPosts(sortMethod) {
        const { dispatch, items } = this.props
        if (items && items.length > 0) {
            dispatch(updatePostSortMethod(sortMethod))
        }
    }

    render() {
        const { category, isFetching, items } = this.props
        return (
            <div className="list-of-posts">
                {/* header */}
                <div className="list-of-posts-header">
                    {/* title */}
                    <div className="list-of-posts-title">
                        {
                            category
                                ? <div className="list-of-posts-title-category">
                                    <NavigateBack />
                                    <h2>{category}</h2>
                                </div>
                                : <h2>All posts</h2>
                        }
                    </div>

                    {/* sorting */}
                    <SortBy onChange={(sortMethod) => this.sortPosts(sortMethod)} />

                    {/* add new post */}
                    <div className="list-of-posts-new-post">
                        <NewPost />
                    </div>
                </div>

                {/* list of posts */}
                {
                    isFetching
                        ? <div style={{ margin: '10px' }}>Loading...</div>
                        : (
                            <div>
                                {
                                    items.length > 0
                                        ? items.map(post => (
                                            <Post
                                                key={post.id}
                                                post={post}
                                            />
                                        ))
                                        : <div style={{ margin: '10px' }}>
                                            This category does not contain any posts yet.
                                        </div>
                                }
                            </div>
                        )
                }

                {/* footer */}
                <div className="list-of-posts-footer">

                    {/* post counter */}
                    <div className="list-of-posts-counter">
                        Total: {items.length} posts
                    </div>

                    {/* add new post */}
                    <div className="list-of-posts-new-post">
                        <NewPost />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ posts, categories }) {
    const { isFetching, sortMethod, sortDirection, items } = posts
    const sortingMethod = util.GetSortMethodByCriteria(sortMethod, sortDirection)
    const sortedItems = Object.keys(items).map(key => items[key]).sort(sortingMethod)
    return {
        isFetching: isFetching,
        sortMethod: sortMethod,
        items : sortedItems
    }
}

export default connect(mapStateToProps)(ListOfPosts)