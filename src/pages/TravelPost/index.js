import React, { Component } from 'react';
import { Card, Button, Image, Container, Carousel, Row, Col, ListGroup, ListGroupItem, Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTravelByID } from '../../actions/travelActions';
import Ratings from './Ratings';
import Comments from './Comments';

class TravelPost extends Component {
  componentDidMount() {
    this.props.getTravelByID(this.props.match.params.id);
  }
  showTravel() { 
    const { travel, loading } = this.props.travel; 
    const { _id, name, location, timestamp, userPosted, description, photos } = travel;

    return (
      <Card key={_id}>
        <Card.Body>
          <Row className="mb-4">
            <Col md={1}></Col>
            <Col md={10}>
            {photos ? 
              <Carousel>
                {photos.map((photo, i) => 
                  <Carousel.Item>
                    <Image
                      className="d-block w-100"
                      src={photo}
                      alt={`Image - ${i+1}`}
                    />
                    <Carousel.Caption>
                      <p>{`Image - ${i+1}`}</p>
                    </Carousel.Caption>
                  </Carousel.Item>  
                )}
              </Carousel>
              : 
              null
            }
              <Row className="mt-4">
                <Col md={4}>
                  <p className="text-center lead"><i className="fa fa-star  fa-fw"></i> 0.0 (0 Raters)</p>
                </Col>
                <Col md={4}>
                  <p className="text-center lead"><i className="fa fa-comment-alt fa-fw"></i> 0 Comments</p>
                </Col>
                <Col md={4}></Col>
              </Row>
            </Col>
            <Col md={1}></Col>
          </Row>
          <Button className="float-right" variant="light"><i className="fa fa-ellipsis-v fa-fw"></i></Button>
          <Button className="float-right" variant="light" title="Save to Travel List"><i className="fa fa-bookmark fa-fw"></i></Button>
          <p className="text-primary" style={{marginBottom: -4}}>
            <span className="lead"><strong>{name}</strong></span> <span>(<i className="fa fa-map-marker-alt fa-fw"></i>{location})</span>
          </p>
          <p className="text-secondary"><i className="fa fa-clock fa-fw"></i> {new Date(timestamp).toLocaleTimeString()} - {new Date(timestamp).toDateString()} &bull; <i className="fa fa-user-circle fa-fw"></i> {userPosted ? userPosted.fullname : null}</p>
          <Tabs fill variant="pills" className="justify-content-center mt-3 mb-4" defaultActiveKey="description" id="uncontrolled-tab-example">
            <Tab eventKey="description" title="Description">
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </Tab>
            <Tab eventKey="rating" title="Ratings">
              <Ratings></Ratings>
            </Tab>
            <Tab eventKey="comment" title="Comments">
              <Comments></Comments>
            </Tab>
            <Tab eventKey="about" title="About Promoter">
            </Tab>
          </Tabs>
            {/* <Col md={8}>
              <p className="text-primary" style={{marginBottom: -4}}>
                <span className="lead"><strong>{name}</strong></span> <span>(<i className="fa fa-map-marker-alt fa-fw"></i>{location})</span>
              </p>
              <p className="text-secondary"><i className="fa fa-clock fa-fw"></i> {new Date(timestamp).toLocaleTimeString()} - {new Date(timestamp).toDateString()} &bull; <i className="fa fa-user-circle fa-fw"></i> {userPosted ? userPosted.fullname : null}</p>
              
            </Col>
            <Col md={4}>
            {userPosted ?
              <div>
                <p className="lead"><strong><i className="fa fa-info-circle fa-fw"></i> About Promoter</strong></p>
                <p className="text-center">
                  <Image src={userPosted.profilePhoto} roundedCircle style={{width: 180, height: 'auto'}}></Image>
                </p>
                <p className="text-center text-primary lead"><strong>{userPosted.fullname}</strong></p>
                <ListGroup>
                  <ListGroupItem><i className="fa fa-mail-bulk fa-fw"></i> {userPosted.email}</ListGroupItem>
                  <ListGroupItem><i className="fa fa-user fa-fw"></i> {userPosted.username}</ListGroupItem>
                  <ListGroupItem><i className="fa fa-user-clock fa-fw"></i> {new Date(userPosted.timestamp).toLocaleTimeString()} - {new Date(userPosted.timestamp).toDateString()}</ListGroupItem>
                </ListGroup>
                <Button className="mt-2" variant="outline-primary" block>Rate Promoter <i className="fa fa-star fa-fw"></i></Button>
                <Button className="mt-2" variant="primary" block>Promoter Profile <i className="fa fa-chevron-right fa-fw"></i></Button>
              </div>
              :
              <p className="text-center"><i className="fa fa-spinner fa-fw fa-pulse"></i> Loading promoter details...</p>
            }
            </Col> */}
        </Card.Body>
      </Card>
    )
  }
  render() {
    const { loading } = this.props.travel;
    return (
      <Container className="mb-5">
        {loading ? 
          <p className="text-center lead"><i className="fa fa-spinner fa-fw fa-pulse"></i> Loading...</p>
          :
          this.showTravel()
        }
      </Container>
    )
  }
}

TravelPost.propTypes = {
  getTravelByID: PropTypes.func.isRequired,
  travel: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  travel: state.travel,
})

export default connect(mapStateToProps, { getTravelByID })(TravelPost);