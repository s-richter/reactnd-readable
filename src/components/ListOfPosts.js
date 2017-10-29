import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Post from './Post'
import NewPost from './NewPost'
import NavigateBack from './NavigateBack'

export default class ListOfPosts extends Component {
    static propTypes = {
        category: PropTypes.string
    }

    componentWillMount() {
        // TODO: get posts from server - GET /posts
        this.posts = [
            {
                id: 1,
                title: 'Post 1',
                author: 'Author 1',
                body: 'content of the post',
                timestamp: '22.10.2017 14:00:00',
                voteScore: 1,
                commentCount: 1,
                category: "react"
            },
            {
                id: 2,
                title: 'Post 2',
                author: 'Author 1',
                body: 'content of the post',
                timestamp: '22.10.2017 14:00:01',
                voteScore: 999,
                commentCount: 2,
                category: "redux"
            }, {
                id: 3,
                title: 'Post 3',
                author: 'Author 2',
                body: 'content of the post',
                timestamp: '22.10.2017 15:00:00',
                voteScore: -1,
                commentCount: 1,
                category: "react"
            }, {
                id: 4,
                title: 'Post 4 with a rather long title, right?',
                author: 'Author 3',
                body: 'content of the post',
                timestamp: '22.10.2017 16:00:00',
                voteScore: -1234,
                commentCount: 999,
                category: "udacity"
            }, {
                id: 5,
                title: 'Post 5 with a shorter title',
                author: 'Author 1',
                body: 'content of the post',
                timestamp: '22.10.2017 17:00:00',
                voteScore: 999,
                commentCount: 999,
                category: "udacity"
            }, {
                id: 6,
                title: 'Post 6',
                author: 'Author 2',
                body: 'content of the post',
                timestamp: '22.10.2017 18:00:00',
                voteScore: 9999,
                commentCount: 9999,
                category: "udacity"
            }, {
                id: 7,
                title: 'Post 7',
                author: 'Author 3',
                body: 'content of the post',
                timestamp: '22.10.2017 19:00:00',
                voteScore: -99999,
                commentCount: 22,
                category: "udacity"
            },
        ]
    }

    render() {
        const { category } = this.props
        return (
            <div className="list-of-posts">

                {/* header */}
                <div className="list-of-posts-header">

                    {/* title */}
                    <div className="list-of-posts-title">
                        {category
                            ? <div className="list-of-posts-title-category">
                                <NavigateBack />
                                <h2>{category}</h2>
                            </div>
                            : <h2>All posts</h2>}
                    </div>

                    {/* sorting */}
                    <div className="list-of-posts-sort-by">
                        <span className="list-of-posts-sort-by-label">Sort by: </span>
                        <select
                            name="list-of-posts-sort-by-select"
                            id="list-of-posts-sort-by-select"
                        >
                            <option value="voteScore">votes</option>
                            <option value="timestamp">timestamp</option>
                            <option value="numberOfComments">comments</option>
                        </select>
                    </div>

                    {/* add new post */}
                    <div className="list-of-posts-new-post">
                        <NewPost />
                    </div>
                </div>

                {/* list of posts */}
                {this.posts.map(post => (
                    <Post
                        key={post.id.toString()}
                        post={post}
                    />
                ))}

                {/* footer */}
                <div className="list-of-posts-footer">

                    {/* post counter */}
                    <div className="list-of-posts-counter">
                        Total: {this.posts.length} posts
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

