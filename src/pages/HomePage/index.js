import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';  
import Sidebar from '../../components/Sidebar';
import TravelFeed from './TravelFeed';

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
        <Row>
          <Col md={8}>
            <TravelFeed></TravelFeed>
          </Col>
          <Col md={4}>
            <Sidebar></Sidebar>
          </Col>
        </Row>
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