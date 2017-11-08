import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class SortBy extends Component {
    static propTypes = {
        itemType: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    }

    render() {
        const { itemType, onChange, sortMethod } = this.props
        return (
            <div className="sort-by">
                <span className="sort-by-label">Sort by: </span>
                <select
                    value={sortMethod}
                    onChange={(event) => onChange(event.target.value)}
                >
                    <option value="timestamp">timestamp</option>
                    <option value="voteScore">votes</option>
                    {
                        itemType !== "comment"
                            ? <option value="commentCount">comments</option>
                            : ""
                    }
                </select>
            </div>
        )
    }
}

function mapStateToProps({ comments, posts }, ownProps) {
    const sortMethod =
        ownProps.itemType === 'comment'
            ? comments.sortMethod
            : posts.sortMethod
    return {
        sortMethod
    }
}

export default connect(mapStateToProps)(SortBy)
