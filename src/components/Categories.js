import React, { Component } from 'react'
import Category from './Category'

export default class Categories extends Component {
    componentWillMount() {
        // TODO: get categories from server - GET /categories
        this.categories = [ 'react', 'redux', 'udacity']
    }

    render() {        
        return (
            <div className="categories">
                <h2>Categories</h2>
                {this.categories.map(cat => (
                    <Category
                        key={cat}
                        name={cat}
                    />
                ))}
        </div>
        )
    }
}


