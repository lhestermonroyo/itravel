import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class Sidebar extends Component {
  render() {
    return (
      <Card style={{}}>
        <Card.Body>
          <p className="lead"><strong><i className="fa fa-filter fa-fw"></i> Filter Options</strong></p>
          <Button variant="primary" block>All Travels</Button>
          <Button variant="outline-primary" block>Highest Rated</Button>
          <Button variant="outline-primary" block>Most Talked About</Button>
          <Button variant="outline-primary" block>New Destinations</Button>
          <p className="lead mt-3"><strong><i className="fa fa-th fa-fw"></i> Categories</strong></p>
          <Button variant="outline-primary" block>Beaches, tropical island, scuba diving, etc..</Button>
          <Button variant="outline-primary" block>Hiking, camping areas, mountains, forest, etc..</Button>
          <Button variant="outline-primary" block>National parks or parks</Button>
          <Button variant="outline-primary" block>Landmarks, historical places, monuments</Button>
          <Button variant="outline-primary" block>Museums and art galleries</Button>
        </Card.Body>
      </Card>
    )
  }
}

export default Sidebar;