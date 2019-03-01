import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Form, FormGroup, FormLabel, FormControl, Button, Row, Col, Card, Image } from 'react-bootstrap';
import { saveTravel } from '../../actions/travelActions';
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
      photosName: [],
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
    let imgNameArray = [];
    let imgCount = e.target.files.length;
  

    for(let i = 0; i < imgCount; i++) {
      imgArray[i] = e.target.files[i];
      imgNameArray[i] = e.target.files[i].name;
    }
    this.setState({
      photos: this.state.photos.concat(imgArray),
      photosName: this.state.photosName.concat(imgNameArray),
    });
  }
  handleRemove(p) {
    this.setState({
      photos: this.state.photos.filter(photo => (p === photo) ? null : photo),
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const { name, description, location, type, photos, photosName } = this.state;

    this.state.photos.map(photo => console.log(photo));
    const travelData = new FormData();
    travelData.append('userId', user._id);
    travelData.append('name', name);
    travelData.append('description', description);
    travelData.append('location', location);
    travelData.append('type', type);
    
    for(let i = 0; i < photos.length; i++) {
      travelData.append('uploadPhotos', photos[i], photosName[i]);
    }

    this.props.saveTravel(travelData, this.props.history);
  }
  render() {  
    const { photos, photosName } = this.state;
    return (
      <Container className="mb-5">
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
                  <FormControl type="file" onChange={this.handlePhotos} name="uploadPhotos" style={{display: 'none'}} multiple accept='image/*'></FormControl>
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

PostTravel.propTypes = {
  saveTravel: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { saveTravel })(PostTravel);