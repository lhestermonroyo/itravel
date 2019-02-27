import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { alertToggleHide } from '../../actions/authActions';
import { alertCloseStyle, alertMessageStyle } from './styles';

class AlertToggle extends Component {
  constructor(props) {
    super(props);

    this.handleHide = this.handleHide.bind(this);
  }
  handleHide() {
    this.props.alertToggleHide();
  }
  render() {
    const { type, message, toggle } = this.props;
    return (
      <Alert show={toggle} variant={type}>
        <p className="float-right" style={alertCloseStyle} onClick={this.handleHide}><i className="fa fa-times fa-fw"></i></p>
        <p style={alertMessageStyle}>{message}</p>
      </Alert>
    )
  }
}

AlertToggle.propTypes = {
  alertToggleHide: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { alertToggleHide })(AlertToggle);