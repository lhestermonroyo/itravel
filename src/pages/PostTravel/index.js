import React, { Component } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Button, Row, Col, Card, Image } from 'react-bootstrap';
import { removeButtonStyle, fileUploadStyle } from './styles';

class PostTravel extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      location: '',
      type: '',
      photos: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handlePhotos = this.handlePhotos.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handlePhotos(e) {
    let imgArray = [];
    let imgCount = e.target.files.length;
  
    console.log("Count:", imgCount);

    for(let i = 0; i < imgCount; i++) {
      imgArray[i] = e.target.files[i];
    }
    this.setState({
      photos: this.state.photos.concat(imgArray),
    });
  }
  handleRemove(p) {
    this.setState({
      photos: this.state.photos.filter(photo => (p === photo) ? null : photo),
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    const newTravel = {
      userId: '',
      name: this.state.name,
      description: this.state.description,
      location: this.state.location,
      type: this.state.type,
      photos: this.state.photos,
    };

    console.log("New travel:", newTravel);
  }
  render() {
    const { photos } = this.state;
    return (
      <Container>
        <p className="display-4" style={{marginBottom: -6}}>Post Travel Destination</p>
        <small className="text-secondary">Promote your choosen travel destination by filling it's details below.</small>
        <Form className="mt-4" onSubmit={this.handleSubmit}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <FormControl type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder="Destination Name"></FormControl>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <FormControl as="textarea" name="description" onChange={this.handleChange} value={this.state.description} rows={5} placeholder="Description"></FormControl>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormControl type="text" name="location" onChange={this.handleChange} value={this.state.location} placeholder="Location"></FormControl>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormControl as="select" onChange={this.handleChange} name="type">
                  <option value="Beaches, tropical island, scuba diving, etc..">Beaches, tropical island, scuba diving, etc..</option>
                  <option value="Hiking, camping areas, mountains, forest, etc..">Hiking, camping areas, mountains, forest, etc..</option>
                  <option value="National parks or parks">National parks or parks</option>
                  <option value="Landmarks, historical places, monuments">Landmarks, historical places, monuments</option>
                  <option value="Museums and art galleries">Museums and art galleries</option>
                  <option selected="selected">Destination Type</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <FormLabel style={{display: 'block'}}>Upload Photos:</FormLabel>
                <label className="file-upload-hover" style={fileUploadStyle}>
                  <i className="fa fa-plus fa-fw fa-3x"></i>
                  <FormControl type="file" onChange={this.handlePhotos} style={{display: 'none'}} multiple accept='image/*'></FormControl>
                </label>
              </FormGroup>
            </Col>
            {photos.length !== 0 ? (
              <Card style={{background: '#f0f0f0'}}>
                <Card.Body>
                  <Row>
                  {photos.map((photo, i) => 
                    <Col md={3} key={i}>
                      <Button style={removeButtonStyle} onClick={e => this.handleRemove(photo)} size="sm" variant="outline-danger"><i className="fa fa-times fa-fw"></i></Button>
                      <Image src={URL.createObjectURL(photo)} className="mb-2" alt={photo.name} rounded thumbnail width="100%"></Image>
                    </Col>
                  )}
                  </Row>
                </Card.Body>
              </Card>
              )
              :
              null
            }
            <Col md={12}>
              <Button type="submit" variant="primary" className="mt-3">Post It <i className="fa fa-check fa-fw"></i></Button>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}


export default PostTravel;