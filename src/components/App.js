import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap'
import Header from './Header'
import Categories from './Categories'
import ListOfPosts from './ListOfPosts'
import NewPost from './NewPost'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Container fluid>
          <Row>
            <Col>
             {/* header of the app */}
             <Header />
            </Col>           
          </Row>
          <Row>
            <Col xs="3">
              {/* available categories */}
              <Categories /></Col>
            <Col xs="9">
              {/* list of the first 10 posts */}
              <ListOfPosts />
              {/* add new post */}
              <NewPost /></Col>
          </Row>
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
