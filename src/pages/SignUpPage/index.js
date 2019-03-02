import React, { Component } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserType from './UserType';

class SignUpPage extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }
  render() {
    return (
      <Container className="mb-5">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <p className="display-4 text-center" style={{marginBottom: -2}}>Sign Up</p>
            <p className="text-center"><small className="text-secondary">Select what kind of user you are and fill in details to create account.</small></p>
            <Tabs variant="pills" className="justify-content-center mt-3 mb-4" defaultActiveKey="promoter" id="uncontrolled-tab-example">
              <Tab eventKey="promoter" title="I'm a Promoter">
                <UserType type="promoter" redirect={this.props.history}></UserType>
              </Tab>
              <Tab eventKey="tourist" title="I'm a Tourist">
                <UserType type="tourist" redirect={this.props.history}></UserType>
              </Tab>
            </Tabs>
            <p className="text-center mt-5">
              Already have an account?
              <Button className="ml-2" variant="outline-primary">Log In</Button>
            </p>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    )
  }
}

SignUpPage.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(SignUpPage));