import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    onChange: PropTypes.func.isRequired
}

function SortBy(props) {
    return (
        <div className="sort-by">
            <span className="sort-by-label">Sort by: </span>
            <select onChange={(event) => props.onChange(event.target.value)}>             
                <option value="timestamp">timestamp</option>
                <option value="voteScore">votes</option>                
                <option value="commentCount">comments</option>
            </select>
        </div>
    )
}

SortBy.propTypes = propTypes

export default SortBy
