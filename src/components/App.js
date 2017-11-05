import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import Header from './Header'
import Main from './Main'
import CategoryView from './CategoryView'
import PostDetail from './PostDetail'
import './App.css';
import './Tooltip.css'

// TODO: when a post gets deleted, all its comments have set their property parentDeleted to true
// TODO: enable the user to pick a picture from a list to show for the post
// TODO: add new post and add new comment
// TODO: implement voting
// TODO: a home button on every page would be nice
// TODO: after returning to a page, the drop down (sort by) always shows timestamp


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

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     backend: 'backend-data'
  //   }
  // }

  // componentDidMount() {
  //   const url = process.env.REACT_APP_BACKEND
  //     ? `${process.env.REACT_APP_BACKEND}/categories`
  //     : 'http://localhost:3001/categories';
  //   console.log('fetching from url', url);
  //   fetch(url, {
  //     headers: { 'Authorization': 'whatever-you-want' },
  //     // credentials: 'include'
  //   })
  //     .then((res) => { return (res.text()) })
  //     .then((data) => {
  //       this.setState({ backend: data });
  //     });
  // }

  // render() {
  //   return (
  //     <div className="App">
  //       <div className="App-header">
  //         {/* <img src={logo} className="App-logo" alt="logo" /> */}
  //         <h2>Welcome to React</h2>
  //       </div>
  //       <p className="App-intro">
  //         To get started, edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <p>
  //         Talking to the backend yields these categories: <br />
  //         {this.state.backend}
  //       </p>
  //     </div>
  //   );
  // }
}

export default App;
