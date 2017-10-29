import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import NoImage from 'react-icons/lib/fa/image'
import EditItem from './EditItem'
import DeleteItem from './DeleteItem'
import DisplayCount from './DisplayCount'
import CommentIcon from 'react-icons/lib/fa/comment-o'
import VoteChanger from './VoteChanger'
import History from './History'

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

    componentDidMount() {
        // TODO: get comments from API

    }

    render() {
        const { post } = this.props
        const showDetails = History.location.pathname.includes("/posts/")
        const link = `/posts/${post.id}`
        return (
            <div className="post">

                {/* general information about the post and controls to manipulate it */}
                <div className="post-header">

                    {/* image of the author or picture for the post. Can be hidden */}
                    <div className="post-image">
                        <NoImage
                            size={35}
                            color='lightgrey' />
                    </div>

                    {/* information about the author and last edit date */}
                    <div className="post-info">
                        <div className="post-title-category">
                            {
                                showDetails
                                    ? <h4>{post.title}</h4>
                                    : <Link to={link}><h4>{post.title}</h4></Link>
                            }
                            <span className="post-category">({post.category})</span>
                        </div>
                        <div className="post-author">
                            written by {post.author} @ {post.timestamp}
                        </div>
                    </div>

                    {/* controls to edit and delete the post */}
                    <div className="post-edit-delete">
                        <EditItem itemName="post" />
                        <DeleteItem itemName="post" />
                    </div>

                    {/* statistics for the post and controls to comment and vote */}
                    <div className="post-stats">
                        {/* number of comments and button to add a new comment*/}
                        <div className="post-comments">
                            <DisplayCount
                                number={post.commentCount}
                            />
                            <div className="post-comment-icon">
                                <div
                                    tooltip="Add a comment"
                                    flow="left"
                                >
                                    <CommentIcon size={20} />
                                </div>
                            </div>
                        </div>
                        {/* number of votes and controls to vote the post up or down */}
                        <div className="post-score">
                            <DisplayCount
                                number={post.voteScore}
                                colorize={true}
                            />
                            <VoteChanger countedName="post" />
                        </div>
                    </div>
                </div>

                {/* the actual content of the post */}
                {
                    showDetails
                        ? <div className="post-content">
                            <div className="post-body">
                                {post.body}
                            </div>
                        </div>
                        : ''
                }
            </div>
        )
    }
}
