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
        const { isFetching, items } = this.props
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
                }
            </div>
        )
    }
}

function mapStateToProps({ categories }) {
    const { isFetching, items } = categories
    return {
        isFetching,
        items
    }
}

export default connect(mapStateToProps)(Categories)
