import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Post extends Component {
    static propTypes = {
        post: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            body: PropTypes.string,
            timestamp: PropTypes.timestamp,
            voteScore: PropTypes.number.isRequired,
            commentCount: PropTypes.number.isRequired,
            category: PropTypes.string.isRequired
        })
    }

    render() {
        const { post } = this.props
        return (
            <div className="post">
                <div className="post-image">
                    {/* image of the author or picture for post. Can be hidden */}
                </div>
                TODO
                {/* <div className="post-vote">
                    <div>{post.voteScore}</div>
                    <div>vote up&nbsp;vote down</div>
                </div>
                <div className="post-content">
                    <div className="post-title">
                        {post.title}
                    </div>

                </div>

                <div className="post-author">
                    <div>{post.author}</div>
                    <div>{post.timestamp}</div>
                </div>
                <div className="post-content">
                    <div className="post-title">
                        {post.title}
                    </div>
                    <div className="post-body">
                        {post.body}
                    </div>
                    <div className="post-vote-score">
                        {post.voteScore}
                    </div>
                    <div className="post-category">
                        {post.category}
                    </div>
                    <div className="post-commentCount">
                        {post.commentCount}
                    </div>
                </div> */}
            </div>
        )
    }
}
