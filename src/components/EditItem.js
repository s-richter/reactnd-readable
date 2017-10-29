import React from 'react'
import PropTypes from 'prop-types'
import Edit from 'react-icons/lib/fa/edit'

const propTypes = {
    itemName: PropTypes.string.isRequired
}

function EditItem(props) {
    const item = `Edit ${props.itemName}`
    return (
        <div
            className="post-edit"
            tooltip={item}
            flow="left"
        >
            <Edit size={20} />
        </div>
    )
}

EditItem.propTypes = propTypes

export default EditItem
