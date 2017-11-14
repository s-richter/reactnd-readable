import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// a drop-down enabling the user to sort by vote score, timestamp and (in case of posts) the
//  number of comments
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
                    <option value="voteScore">votes</option>
                    <option value="timestamp">timestamp</option>
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
