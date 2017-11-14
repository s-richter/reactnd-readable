import React from 'react'
import ListOfPosts from '../posts/ListOfPosts'

// shows the posts associated with a single category
export default function CategoryView(props) {
    const path = props.location.pathname
    const category = path.substr(path.lastIndexOf("/") + 1)
    return (
        <div className="category-view">
            <ListOfPosts category={category} />
        </div>
    )
}
