import React, { Component } from 'react'
import Post from './Post'

export default class ListOfPosts extends Component {
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
                voteScore: 2,
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
                title: 'Post 4',
                author: 'Author 3',
                body: 'content of the post',
                timestamp: '22.10.2017 16:00:00',
                voteScore: 5,
                commentCount: 0,
                category: "udacity"
            },
        ]
    }

    render() {
        return (
            <div className="list-of-posts">
                <h2>List of posts</h2>
                {this.posts.map(post => (
                    <Post
                        key={post.id.toString()}
                        post={post}
                    />
                ))}
            </div>
        )
    }
}

