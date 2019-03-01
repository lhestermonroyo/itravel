import React, { Component } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Row, Col, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUser } from '../../actions/authActions';
import AlertToggle from './AlertToggle';

class SignUpPage extends Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    const { fullname, username, password } = this.state;
    const newUser = {
      fullname: fullname,
      username: username,
      password: password,
    };
    this.props.saveUser(newUser, this.props.history);
    this.setState({
      fullname: '',
      username: '',
      password: '',
    });
  }
  render() {
    const { alertToggle, alertMessage, alertType } = this.props.auth;
    return (
      <Container className="mb-5">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <p className="display-4 text-center">Sign Up</p>
            {alertToggle ? 
              <AlertToggle toggle={alertToggle} type={alertType} message={alertMessage}></AlertToggle> 
              : null
            }
            <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <FormLabel>Fullname:</FormLabel>
                <FormControl type="text" name="fullname" onChange={this.handleChange} value={this.state.fullname}></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Username:</FormLabel>
                <FormControl type="text" name="username" onChange={this.handleChange} value={this.state.username}></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Password:</FormLabel>
                <FormControl type="password" name="password" onChange={this.handleChange} value={this.state.password}></FormControl>
              </FormGroup>
              <Button type="submit" variant="primary" block>Create Account</Button>
              <p className="text-center mt-5">
                Already have an account?
                <Button className="ml-2" variant="outline-primary">Log In</Button>
              </p>
            </Form>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    )
  }
}

SignUpPage.propTypes = {
  saveUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { saveUser })(withRouter(SignUpPage));