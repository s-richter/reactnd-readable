import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import Header from './Header'
import Main from './Main'
import CategoryView from './CategoryView'
import PostDetail from './PostDetail'
import './App.css';
import './Tooltip.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Container fluid>
          <Row>
            <Col>
              {/* the title of the app */}
              <Header />
            </Col>
          </Row>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/categories/:category' component={CategoryView} />
            <Route
              path='/posts/:postId'
              render={({ match }) =>
                <PostDetail postId={match.params.postId} />
              } />

          </Switch>

        </Container>
      </div>
    )
  }
}

export default App;
