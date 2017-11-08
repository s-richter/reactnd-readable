import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class EditItemSelect extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    }

    render() {
        const { label, value, name, onChange, categoryColors } = this.props
        return (
            <div className="edit-item-select">
                <div className="edit-label">{label}</div>
                <div className="edit-input">
                    <select
                        value={value}
                        onChange={event => {
                            onChange(name, event.target.value)
                        }}
                    >
                        {
                            Object.keys(categoryColors).map(color => (
                                <option
                                    key={color}
                                    value={color}>
                                    {color}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ categories }, ownProps) {
    return {
        categoryColors: categories.categoryColors
    }
}

export default connect(mapStateToProps)(EditItemSelect)
