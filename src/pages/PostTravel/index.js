import React, { Component } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Button, Row, Col } from 'react-bootstrap';
import { uploadLabelStyle } from './styles';

class PostTravel extends Component {
  constructor() {
    super();

    this.state = {
      photos: [],
      photosDisplay: null,
    }

    this.handlePhotos = this.handlePhotos.bind(this);
  }
  handlePhotos(e) {
    this.setState({
      photos: this.state.photos.push(e.target.files[0]),
      photosDisplay: URL.createObjectURL(e.target.files[0]),
    });
    console.log(this.state.photos);
    console.log(this.state.photosDisplay);
  }
  render() {
    return (
      <Container>
        <p className="display-4" style={{marginBottom: -6}}>Post Travel Destination</p>
        <small className="text-secondary">Promote your choosen travel destination by filling it's details below.</small>
        <Form className="mt-4">
          <Row>
            <Col md={12}>
              <FormGroup>
                <FormControl type="text" placeholder="Destination Name"></FormControl>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <FormControl as="textarea" rows={5} placeholder="Description"></FormControl>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormControl type="text" placeholder="Location"></FormControl>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormControl as="select">
                  <option selected="selected">Destination Type</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <FormLabel>Post Your Travel Destination Photos:</FormLabel>
                <FormControl type="file" onChange={this.handlePhotos} multiple accept='image/*'></FormControl>
              </FormGroup>
            </Col>
            <Col md={12}>
              <Button variant="primary" className="mt-5">Post It <i className="fa fa-check fa-fw"></i></Button>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}


export default PostTravel;