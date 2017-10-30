import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

function EditItemSelect(props) {
    return (
        <div className="edit-item-select">
            <div className="edit-label">{props.label}</div>
            <div className="edit-input">
                {/* TODO: get categories from store and make them available as props */}
                <select
                    value={props.value}
                    onChange={(value) => { props.onChange(value) }}
                >
                    <option value="react">react</option>
                    <option value="redux">redux</option>
                    <option value="udacity">udacity</option>
                </select>
            </div>
        </div>
    )
}

EditItemSelect.propTypes = propTypes

export default EditItemSelect
