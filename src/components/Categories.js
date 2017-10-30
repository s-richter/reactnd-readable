import React, { Component } from 'react'
import Category from './Category'

export default class Categories extends Component {
    componentWillMount() {
        // TODO: get categories from server - GET /categories
        this.categories = ['react', 'redux', 'udacity']

        // TODO: get category colors from store
        this.categoryColors = {
            "react": "#61DAFB",
            "redux": "#764ABC",
            "udacity": "#06ADDB"
        }
    }

    render() {
        return (
            <div className="categories">
                <div className="categories-header">
                    <div className="categories-title">
                        <h2>Categories</h2>
                    </div>
                </div>
                {this.categories.map(cat => (
                    <Category
                        key={cat}
                        name={cat}
                        categoryColor={this.categoryColors[cat]}
                    />
                ))}
            </div>
        )
    }
}


