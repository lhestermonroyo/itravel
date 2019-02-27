import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../actions/authActions';
import { navbarSearch } from './styles';

class Header extends Component {
  constructor() {
    super();

    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() {
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Navbar collapseOnSelect className="mb-3" expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#home"><i className="fa fa-angle-double-up fa-fw"></i> iTravel</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav"> 
            <Nav className="mr-auto">
            <Form inline>
            <FormControl type="text" style={navbarSearch} placeholder="Search for places, landmarks, etc..." className="mr-sm-2" />
            <Button variant="outline-primary"><i className="fa fa-search fa-fw"></i></Button>
          </Form>
            </Nav>
            {isAuthenticated ? 
            <Nav>
              <Link to="/dashboard" style={{textDecoration: 'none'}}>
                <Nav.Link href="/dashboard">Home</Nav.Link>            
              </Link>
              <Link to="/post-travel" style={{textDecoration: 'none'}}>
                <Nav.Link href="/post-travel">Post Travel Destination</Nav.Link>            
              </Link>
              <NavDropdown title={user.fullname} id="basic-nav-dropdown">
                <NavDropdown.Item href=""><i className="fa fa-user-circle fa-fw"></i> Profile</NavDropdown.Item>
                <NavDropdown.Item href=""><i className="fa fa-cog fa-fw"></i> Account Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.handleLogOut}><i className="fa fa-sign-out-alt fa-fw"></i> Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            :
            <Nav>
              <Link to="/" style={{textDecoration: 'none'}}>
                <Nav.Link href="/">Home</Nav.Link>            
              </Link>
              <Link to="/login" style={{textDecoration: 'none'}}>
                <Nav.Link href="/login">Log In</Nav.Link>            
              </Link>
              <Link to="/signup" style={{textDecoration: 'none'}}>
                <Nav.Link href="/signup">Sign Up</Nav.Link>            
              </Link>
            </Nav>
            }
          </Navbar.Collapse> 
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(Header);