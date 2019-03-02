import React, { Component } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUser } from '../../actions/authActions';
import AlertToggle from './AlertToggle';

class UserType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      email: '',
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    const { fullname, email, username, password } = this.state;
    const newUser = {
      fullname: fullname,
      email: email,
      username: username,
      password: password,
      userType: this.props.type,
    };
    this.props.saveUser(newUser, this.props.redirect);
  }
  render() {
    const { type } = this.props;
    const { alertToggle, alertMessage, alertType, loading } = this.props.auth;
    if(type === "promoter") {
      return (
        <div>
          {alertToggle ? 
            <AlertToggle toggle={alertToggle} type={alertType} message={alertMessage}></AlertToggle> 
            : null
          }
          {loading ? 
            <p className="text-center lead"><i className="fa fa-spinner fa-fw fa-pulse"></i> Loading...</p>
            :
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <FormLabel>Fullname:</FormLabel>
                <FormControl type="text" name="fullname" onChange={this.handleChange} value={this.state.fullname}></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>E-mail:</FormLabel>
                <FormControl type="email" name="email" onChange={this.handleChange} value={this.state.email}></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Username:</FormLabel>
                <FormControl type="text" name="username" onChange={this.handleChange} value={this.state.username}></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Password:</FormLabel>
                <FormControl type="password" name="password" onChange={this.handleChange} value={this.state.password}></FormControl>
              </FormGroup>
              <Button type="submit" variant="primary" block size="lg">Create Promoter Account</Button>
            </Form>
          }
        </div>
      )
    }
    else if(type === "tourist") {
      return (
        <div>
          {alertToggle ? 
            <AlertToggle toggle={alertToggle} type={alertType} message={alertMessage}></AlertToggle> 
            : null
          }
          {loading ? 
            <p className="text-center lead"><i className="fa fa-spinner fa-fw fa-pulse"></i> Loading...</p>
            :
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <FormLabel>Fullname:</FormLabel>
                <FormControl type="text" name="fullname" onChange={this.handleChange} value={this.state.fullname}></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>E-mail:</FormLabel>
                <FormControl type="email" name="email" onChange={this.handleChange} value={this.state.email}></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Username:</FormLabel>
                <FormControl type="text" name="username" onChange={this.handleChange} value={this.state.username}></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Password:</FormLabel>
                <FormControl type="password" name="password" onChange={this.handleChange} value={this.state.password}></FormControl>
              </FormGroup>
              <Button type="submit" variant="primary" size="lg" block>Create Tourist Account</Button>
            </Form>
          }
        </div>
      )
    }
  }
}

UserType.propTypes = {
  saveUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { saveUser })(UserType);