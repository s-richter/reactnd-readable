import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

function EditItemInput(props) {
    return (
        <div className="edit-item-input">
            <div className="edit-label">{props.label}</div>
            <div className="edit-input">
                <input
                    type="text"
                    value={props.value}
                    onChange={(value) => { props.onChange(value) }} />
            </div>
        </div>
    )
}

EditItemInput.propTypes = propTypes

export default EditItemInput
