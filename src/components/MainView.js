import React from 'react'
import { Row, Col } from 'reactstrap'
import Categories from './categories/Categories'
import ListOfPosts from './posts/ListOfPosts'

// the main view of the app showing the available categories and all posts
function MainView(props) {
    return (
        <Row>
            <Col sm="3">
                {/* available categories */}
                <Categories />
            </Col>
            <Col sm="9">
                {/* list of the posts */}
                <ListOfPosts />
            </Col>
        </Row>
    )
}

export default MainView
