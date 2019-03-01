import React, { Component } from 'react';
import { Container, Card, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';  

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut(e) {
    e.preventDefault();

    this.props.logoutUser();
  }
  render() {
    const { user } = this.props.auth;
    return (
      <Container className="mb-5">
        <p className="display-4 text-center">Hi, {user.fullname}, Welcome to Dashboard</p>
      </Container>
    )
  }
}

DashboardPage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(DashboardPage);