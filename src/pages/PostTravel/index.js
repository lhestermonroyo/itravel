import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Form, FormGroup, FormLabel, FormControl, Button, Row, Col, Card, Image } from 'react-bootstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { saveTravel } from '../../actions/travelActions';
import { removeButtonStyle, fileUploadStyle } from './styles';

const types = [
  "Beaches, tropical island, scuba diving, etc..",
  "Hiking, camping areas, mountains, forest, etc..",
  "National parks or parks",
  "Landmarks, monuments, cultural and historical places",
  "Museums and art galleries",
];

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
    travelData.append('userPosted', user._id);
    travelData.append('name', name);
    travelData.append('description', description);
    travelData.append('location', location);
    travelData.append('type', type);

    console.log(travelData);
    for(let i = 0; i < photos.length; i++) {
      travelData.append('uploadPhotos', photos[i], photosName[i]);
    }

    this.props.saveTravel(travelData, this.props.history);
  }
  render() {  
    const { photos } = this.state;
    const { loading } = this.props.travel;
    return (
      <Container className="mb-5">
        <p className="display-4" style={{marginBottom: -6}}>Post Travel Destination</p>
        <small className="text-secondary">Promote your choosen travel destination by filling it's details below.</small>
        {loading ?
          <p className="text-center lead"><i className="fa fa-spinner fa-fw fa-pulse"></i> Loading...</p>
          :
          <Form className="mt-4" onSubmit={this.handleSubmit}>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <FormLabel>Destination Name:</FormLabel>
                  <FormControl type="text" name="name" onChange={this.handleChange} value={this.state.name}></FormControl>
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormLabel>Description:</FormLabel>
                <FormGroup>
                  <CKEditor
                    editor={ ClassicEditor }
                    data={this.state.description}
                    name="description"
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.setState({
                          description: data,
                        });
                        console.log(this.state.description);
                    } }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <FormLabel>Location:</FormLabel>
                  <FormControl type="text" name="location" onChange={this.handleChange} value={this.state.location} placeholder="Location"></FormControl>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <FormLabel>Destination Type:</FormLabel>
                  <FormControl as="select" onChange={this.handleChange} name="type">
                    {types.map(type => <option value={type}>{type}</option>)}
                    <option selected="selected"></option>
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
                <Button type="submit" variant="primary" size="lg" className="mt-3">Promote Destination</Button>
              </Col>
            </Row>
          </Form>
        }
      </Container>
    )
  }
}

PostTravel.propTypes = {
  saveTravel: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  travel: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  travel: state.travel,
});

export default connect(mapStateToProps, { saveTravel })(PostTravel);