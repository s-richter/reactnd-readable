import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Post from './Post'
import Comment from './Comment'
import NewComment from './NewComment'
import NavigateBack from './NavigateBack'

export default class PostDetail extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    constructor() {
        super()
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
            }, {
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

        this.comments = [
            {
                id: 1,
                postId: 1,
                title: 'Comment 1',
                author: 'Author 2',
                body: 'content of the comment',
                timestamp: '29.10.2017 14:00:00',
                voteScore: 1,
                category: "react"
            }, {
                id: 2,
                postId: 1,
                title: 'Comment 2',
                author: 'Author 1',
                body: 'content of the comment',
                timestamp: '29.10.2017 15:00:00',
                voteScore: 5,
                category: "react"
            }, {
                id: 3,
                postId: 1,
                title: 'Comment 3',
                author: 'Author 3',
                body: 'content of the comment',
                timestamp: '29.10.2017 16:00:00',
                voteScore: -4,
                category: "react"
            }
        ]
    }

    componentDidMount() {
        // TODO: fetch correct post from store

    }

    render() {
        return (
            <div className="post-detail">
                {/* the post */}
                <Post post={this.posts.find((item) => item.id.toString() === this.props.postId)} />

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
                    {this.comments.map(comment => (
                        <Comment
                            key={comment.id.toString()}
                            comment={comment} />
                    ))}
                </div>

                {/* footer */}
                <div className="list-of-comments-footer">

                    {/* comment counter */}
                    <div className="list-of-comments-counter">
                        Total: {this.comments.length} comments
                    </div>

                    {/* add new comment */}
                    <div className="list-of-comments-new-comment">
                        <NewComment />
                    </div>
                </div>

                <div className="post-detail-navigate-back">
                    <NavigateBack />
                </div>
            </div>
        )
    }

}