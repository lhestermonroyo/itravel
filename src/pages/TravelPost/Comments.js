import React, { Component } from 'react';
import { Card, FormControl, Form, FormLabel, FormGroup, Button } from 'react-bootstrap';

class Comments extends Component {
  constructor() {
    super();
 
    this.state = {
      comment: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <p className="lead text-primary">Comment Something About this Travel Destination</p>
            <Form>
              <FormGroup>
                <FormLabel>Comment:</FormLabel>
                <FormControl as="textarea" rows="2" name="comment" onChange={this.handleChange} value={this.state.comment}></FormControl>
              </FormGroup>
              <Button variant="primary" size="lg">Save Rating</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Comments;