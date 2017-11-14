import React, { Component } from 'react'
import { connect } from 'react-redux'
import Category from './Category'
import { fetchCategories } from '../../actions'

// container component that shows the available categories
class Categories extends Component {  
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchCategories())
    }

    render() {
        const { isFetching, failedToLoadCategories, items, categoryColors } = this.props
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
                                                categoryColor={categoryColors[cat]}
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
    const { isFetching, failedToLoadCategories, items, categoryColors } = categories    
    return {
        isFetching,
        failedToLoadCategories,
        items,
        categoryColors
    }
}

export default connect(mapStateToProps)(Categories)