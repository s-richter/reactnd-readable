import React, { Component } from 'react'
import { connect } from 'react-redux'
import Category from './Category'
import { fetchCategories } from '../actions'

class Categories extends Component {
    constructor() {
        super()
        // TODO: get category colors from store
        this.categoryColors = {
            "react": "#61DAFB",
            "redux": "#764ABC",
            "udacity": "#06ADDB"
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchCategories())
    }

    render() {
        const { isFetching, failedToLoadCategories, items } = this.props
        return (
            <div className="categories">
                <div className="categories-header">
                    <div className="categories-title">
                        <h2>Categories</h2>
                    </div>
                </div>
                {
                    isFetching
                        ? <div style={{ margin: '10px' }}>Loading...</div>
                        : (
                            failedToLoadCategories
                                ? <div style={{ margin: '10px' }}>
                                    There was an error loading the categories.
                            </div>
                                : <div>
                                    {
                                        items.map(cat => (
                                            <Category
                                                key={cat}
                                                name={cat}
                                                categoryColor={this.categoryColors[cat]}
                                            />
                                        ))
                                    }
                                </div>
                        )
                }
            </div>
        )
    }
}

function mapStateToProps({ categories }) {
    const { isFetching, failedToLoadCategories, items } = categories
    return {
        isFetching,
        failedToLoadCategories,
        items
    }
}

export default connect(mapStateToProps)(Categories)
