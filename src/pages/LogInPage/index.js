import React, { Component } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import AlertToggle from './AlertToggle';

class LogInPage extends Component {
  constructor() {
    super();

    this.state = {
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
  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
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

    const userData = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  }
  render() {
    const { alertToggle, alertMessage, alertType } = this.props.auth;
    return (
      <Container className="mb-5">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <p className="display-4 text-center">Log In Here</p>
            {alertToggle ? 
              <AlertToggle toggle={alertToggle} type={alertType} message={alertMessage}></AlertToggle> 
              : null
            }
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <FormLabel>Username:</FormLabel>
                <FormControl type="text" name="username" onChange={this.handleChange} value={this.state.username}></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Password:</FormLabel>
                <FormControl type="password" name="password" onChange={this.handleChange} value={this.state.password}></FormControl>
              </FormGroup>
              <Button type="submit" variant="primary" block>Log In</Button>
              <p className="text-center mt-5">
                Don't have an account?
                <Button className="ml-2" variant="outline-primary">Sign Up</Button>
              </p>
            </Form>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    )
  }
}

LogInPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(LogInPage);