import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import Post from './Post'
import ListOfComments from '../comments/ListOfComments'
import NavigateBack from '../shared/NavigateBack'
import { fetchPostById } from '../../actions'

// component that shows the details of a post and its comments
class PostDetails extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    componentDidMount() {
        const { dispatch, postId, post } = this.props
        if (!post) {
            dispatch(fetchPostById(postId))
        }
    }

    render() {
        const { isFetching, failedToLoadPost, post } = this.props
        return (
            <Row className="post-detail">
                <Col sm="12">
                    <div className="post-detail-container">
                        <div className="post-detail-navigate-back">
                            <NavigateBack />
                        </div>
                        {/* the post */}
                        <div className="post-detail-post">
                            {
                                isFetching
                                    ? <div style={{ margin: '15px' }}>Loading post...</div>
                                    : (
                                        failedToLoadPost
                                            ? <div style={{ margin: '15px' }}>
                                                There was an error loading the post.
                                                Maybe the post doesn't exist or the server is down.
                                                 </div>

                                            : post.deleted
                                                ? <Redirect to="/" />
                                                : <Post post={post} />
                                    )
                            }
                        </div>
                    </div>

                    {
                        isFetching || failedToLoadPost
                            ? ""
                            : <ListOfComments postId={post.id} />
                    }
                </Col>
            </Row>
        )
    }
}

function mapStateToProps({ posts, comments }, ownProps) {
    const { items } = posts
    // on a page reload or a bookmarked page there might not be any posts. In this case the posts
    //  are fetched later on in componentDidMount().
    if (Object.keys(items).length === 0) {
        return {
            isFetching: posts.isFetching,
            posts,
            comments: [],
            failedToLoadPost: true
        }
    }

    const post = items[ownProps.postId]
    return {
        isFetching: false,
        post,
        failedToLoadPost: false
    }
}

export default connect(mapStateToProps)(PostDetails)