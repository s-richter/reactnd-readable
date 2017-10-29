import React from 'react'
import { Row, Col } from 'reactstrap'
import Categories from './Categories'
import ListOfPosts from './ListOfPosts'

function Main(props) {
    return (
        <Row>
            <Col sm="3">
                {/* available categories */}
                <Categories />
            </Col>
            <Col sm="9">
                {/* list of the first 10 posts */}
                <ListOfPosts />
            </Col>
        </Row>
    )
}

export default Main
