import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Top50Strings from './components/Top50Strings';
import StringList from './components/StringList';
import Search from './components/Search';
import './App.css'

class App extends Component {


  render() {
    return (
      <div className="App">
      <h2>String Search App</h2>
        <Container>
          <Search />
        </Container>
        <Container fluid>
          <Row>
            <Col xs={6}>
              <Top50Strings />
            </Col>
            <Col xs={6}>
              <StringList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
