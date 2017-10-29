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
  //         <img src={logo} className="App-logo" alt="logo" />
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
