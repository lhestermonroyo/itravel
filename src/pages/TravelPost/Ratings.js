import React, { Component } from 'react';
import { Card, FormControl, Form, FormLabel, FormGroup, Button } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

class Ratings extends Component {
  constructor() {
    super();
 
    this.state = {
      rating: 0,
      comment: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    console.log(this.state.rating);
    return (
      <div>
        <Card>
          <Card.Body>
            <p className="lead text-primary">Rate this Travel Destination</p>
            <Form>
              <FormGroup>
                <FormLabel style={{display: 'block'}}>Select your rating:</FormLabel>
                <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={this.state.rating}
                  onStarClick={this.onStarClick.bind(this)}
                  renderStarIcon={() => <i className="fa fa-star fa-2x"></i>}
                ></StarRatingComponent>
                <p className="text-secondary">You rated {(this.state.rating).toFixed(1)} out of 5 this travel destination.</p>
              </FormGroup>
              <FormGroup>
                <FormLabel>Why you rated this travel destination with {(this.state.rating).toFixed(1)}:</FormLabel>
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

export default Ratings;