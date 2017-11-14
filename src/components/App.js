import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import Header from './Header'
import MainView from './MainView'
import CategoryView from './categories/CategoryView'
import PostDetails from './posts/PostDetails'
import '../css/App.css';
import '../css/Tooltip.css'

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
            <Route exact path='/' component={MainView} />
            <Route path='/categories/:category' component={CategoryView} />
            <Route
              path='/posts/:postId'
              render={({ match }) =>
                <PostDetails postId={match.params.postId} />
              } />

          </Switch>

        </Container>
      </div>
    )
  }
}

export default App;
