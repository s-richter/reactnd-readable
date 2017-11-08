import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
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
                    onChange={event => {
                        props.onChange(props.name, event.target.value)
                    }} />
            </div>
        </div>
    )
}

EditItemTextArea.propTypes = propTypes

export default EditItemTextArea
