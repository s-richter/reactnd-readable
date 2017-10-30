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
                id: "1",
                timestamp: 1509353271621,
                title: "Post 1",
                body: "content of the post. This is going to be a longer post, so that we can see what happens when the comment is longer than a single line.",
                author: "Author 1",
                category: "react",
                voteScore: 1,
                deleted: false,
                commentCount: 1
            },
            {
                id: "2",
                timestamp: 1509353371621,
                title: "Post 2",
                body: "content of the post",
                author: "Author 1",
                category: "redux",
                voteScore: 999,
                deleted: false,
                commentCount: 2
            }, {
                id: "3",
                timestamp: 1509353471621,
                title: "Post 3",
                body: "content of the post",
                author: "Author 2",
                category: "react",
                voteScore: -1,
                deleted: false,
                commentCount: 1
            }, {
                id: "4",
                timestamp: 1509353571621,
                title: "Post 4 with a rather long title, right?",
                body: "content of the post",
                author: "Author 3",
                category: "udacity",
                voteScore: -1234,
                deleted: false,
                commentCount: 999
            }, {
                id: "5",
                timestamp: 1509353671621,
                title: "Post 5 with a shorter title",
                body: "content of the post",
                author: "Author 1",
                category: "udacity",
                voteScore: 999,
                deleted: false,
                commentCount: 999
            }, {
                id: "6",
                timestamp: 1509353771621,
                title: "Post 6",
                body: "content of the post",
                author: "Author 2",
                category: "udacity",
                voteScore: 9999,
                deleted: false,
                commentCount: 9999
            }, {
                id: "7",
                timestamp: 1509353871621,
                title: "Post 7",
                body: "content of the post",
                author: "Author 3",
                category: "udacity",
                voteScore: -99999,
                deleted: false,
                commentCount: 22
            },
        ]

        this.comments = [
            {
                id: "1",
                parentId: "1",
                timestamp: 1509353351621,
                body: "content of the comment. This is a rather long comment, or is it? At least it is longer than one line, and that ist what counts",
                author: "Author 2",
                voteScore: 1,
                deleted: false,
                parentDeleted: false
            }, {
                id: "2",
                parentId: "1",
                timestamp: 1509353451621,
                body: "content of the comment",
                author: "Author 1",
                voteScore: 5,
                deleted: false,
                parentDeleted: false
            }, {
                id: "3",
                parentId: "1",
                timestamp: 1509353551621,
                body: "content of the comment",
                author: "Author 3",
                voteScore: -4,
                deleted: false,
                parentDeleted: false
            }, {
                id: "4",
                parentId: "1",
                timestamp: 1509353651621,
                body: "content of the comment",
                author: "Author 1",
                voteScore: -284,
                deleted: false,
                parentDeleted: false
            }, {
                id: "5",
                parentId: "1",
                timestamp: 1509353751621,
                body: "content of the comment",
                author: "Author 2",
                voteScore: 1234,
                deleted: false,
                parentDeleted: false
            }, {
                id: "6",
                parentId: "1",
                timestamp: 1509353851621,
                body: "content of the comment",
                author: "Author 1",
                voteScore: 0,
                deleted: false,
                parentDeleted: false
            }
        ]
    }

    componentDidMount() {
        // TODO: fetch correct post from store

    }

    render() {
        return (
            <div className="post-detail-container">
                <div className="post-detail">

                    <div className="post-detail-container">
                        <div className="post-detail-navigate-back">
                            <NavigateBack />
                        </div>
                        {/* the post */}
                        <div className="post-detail-post">
                            <Post post={this.posts.find((item) => item.id === this.props.postId)} />
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
                        {this.comments.map(comment => (
                            <Comment
                                key={comment.id}
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
                </div>                
            </div>
        )
    }

}