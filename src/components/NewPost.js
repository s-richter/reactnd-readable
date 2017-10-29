import React from 'react'
import NewMessage from 'react-icons/lib/fa/envelope-o'

function NewPost() {
    return (
        <div>
            <div
                className="new-post"
                tooltip="Add a new post"
                flow="left"
            >
            <span className="new-comment-plus">+ </span>
            <NewMessage size={25} />
            </div>
        </div>
    )
}

export default NewPost
