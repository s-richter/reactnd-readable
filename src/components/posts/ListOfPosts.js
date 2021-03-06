import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Post from './Post'
import NewPost from './NewPost'
import NavigateBack from '../shared/NavigateBack'
import SortBy from '../shared/SortBy'
import * as util from '../../util'
import { fetchPosts, fetchAllPosts, updatePostSortMethod } from '../../actions'

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
                    <SortBy
                        itemType="post"
                        onChange={(sortMethod) => this.sortPosts(sortMethod)} />

                    {/* add new post */}
                    <div className="list-of-posts-new-post">
                        <NewPost size={25} />
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
                        <NewPost size={25} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ posts, categories }, ownProps) {
    const { isFetching, sortMethod, sortDirection, items } = posts
    const { category } = ownProps
    // items might be empty, e.g. when the page has been reloaded or bookmarked and the store is empty.
    //  In this case the posts are fetched later on in componentDidMount().
    // category might also be empty (undefined), which simply means all posts should be displayed
    // if there are items, they have to be filtered to get the posts with the right category
    const filteredItems =
        category
            ?
            Object.keys(items)
                .filter(key => items[key].category === category && items[key].deleted === false)
                .reduce((obj, key) => {
                    obj[key] = items[key];
                    return obj
                }, {})
            : Object.keys(items)
                .filter(key => items[key].deleted === false)
                .reduce((obj, key) => {
                    obj[key] = items[key];
                    return obj
                }, {})
    const sortingMethod = util.GetSortMethodByCriteria(sortMethod, sortDirection)
    // sortDirection is actually not used right now, but the UI could be easily changed to support it
    const sortedItems =
        Object.keys(filteredItems)
            .map(key => filteredItems[key])
            .sort(sortingMethod)
    return {
        isFetching: isFetching,
        sortMethod: sortMethod,
        items: sortedItems
    }
}

export default connect(mapStateToProps)(ListOfPosts)