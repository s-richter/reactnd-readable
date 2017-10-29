import React from 'react'
import PropTypes from 'prop-types'
import CommentIcon from 'react-icons/lib/fa/comment-o'

const propTypes = {
    float: PropTypes.string
}

function NewComment(props) {
    const { float } = props
    return (
        <div>
            <div
                className="new-comment"
                tooltip="Add a new comment"
                flow={
                    float
                        ? float
                        : "left"
                }
            >
                <span className="new-comment-plus">+ </span>
                <CommentIcon size={25} />
            </div>
        </div>
    )
}

NewComment.propTypes = propTypes

export default NewComment