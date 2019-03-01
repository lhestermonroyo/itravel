import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class LandingPage extends Component {
  constructor() {
    super();
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
  render() {
    return (
      <Container className="mb-5">
        <h1>Welcome to Landing Page</h1>
      </Container>
    )
  }
}

LandingPage.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(LandingPage);