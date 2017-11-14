import React from 'react'
import PropTypes from 'prop-types'
import Edit from 'react-icons/lib/fa/edit'

const propTypes = {
    itemName: PropTypes.string.isRequired,
    onEdit: PropTypes.func
}

function EditItemButton(props) {
    const item = `Edit ${props.itemName}`
    return (
        <div
            className="post-edit"
            tooltip={item}
            flow="left"
            onClick={() => props.onEdit()}
        >
            <Edit size={20} />
        </div>
    )
}

EditItemButton.propTypes = propTypes

export default EditItemButton
