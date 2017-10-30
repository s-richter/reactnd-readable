import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

function EditItemTextArea(props) {
    return (
        <div className="edit-item-textarea">
            <div className="edit-label">{props.label}</div>
            <div className="edit-input">
                <textarea
                    type="text"
                    value={props.value}
                    onChange={(value) => { props.onChange(value) }} />
            </div>
        </div>
    )
}

EditItemTextArea.propTypes = propTypes

export default EditItemTextArea
