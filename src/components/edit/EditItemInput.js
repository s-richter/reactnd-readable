import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool
}

function EditItemInput(props) {
    return (
        <div className="edit-item-input">
            <div className="edit-label">{props.label}</div>
            <div className="edit-input">
                {
                    props.autoFocus
                        ? <input
                            type="text"
                            autoFocus
                            value={props.value}
                            onChange={event => {
                                props.onChange(props.name, event.target.value)
                            }} />
                        : <input
                            type="text"
                            value={props.value}
                            onChange={event => {
                                props.onChange(props.name, event.target.value)
                            }} />
                }
            </div>
        </div>
    )
}

EditItemInput.propTypes = propTypes

export default EditItemInput
