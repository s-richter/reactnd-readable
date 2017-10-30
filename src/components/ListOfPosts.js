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
    }

    render() {
        // this.posts.map(post => (
        //     console.log({...post})
        // ))        
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
                        {/* TODO: get categories from store */}
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
                        key={post.id}
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

