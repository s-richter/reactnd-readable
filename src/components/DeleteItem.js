import React from 'react'
import PropTypes from 'prop-types'
import Trash from 'react-icons/lib/fa/trash-o'

const propTypes = {
    itemName: PropTypes.string.isRequired
}

function DeleteItem(props) {
    const item = `Delete ${props.itemName}`
    return (
        <div
            className="post-delete"
            tooltip={item}
            flow="left"

        >
            <Trash size={20} />
        </div>
    )
}

DeleteItem.propTypes = propTypes

export default DeleteItem
