import React, { Component } from 'react';
import { Card, Button, Image, Container, Carousel, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTravelByID } from '../../actions/travelActions';

class TravelPost extends Component {
  componentDidMount() {
    this.props.getTravelByID(this.props.match.params.id);
  }
  showTravel() { 
    const { travel, loading } = this.props.travel; 
    const { _id, name, location, timestamp, userPosted, description, photos } = travel;
    // document.getElementById('desc').innerHTML = description;
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
                    <img
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
            </Col>
            <Col md={1}></Col>
          </Row>
          <Row>
            <Col md={8}>
              <p className="text-primary" style={{marginBottom: -4}}>
                <span className="lead"><strong>{name}</strong></span> <span>(<i className="fa fa-map-marker-alt fa-fw"></i>{location})</span>
              </p>
              <p className="text-secondary"><i className="fa fa-clock fa-fw"></i> {new Date(timestamp).toLocaleTimeString()} - {new Date(timestamp).toDateString()} &bull; <i className="fa fa-user-circle fa-fw"></i> {userPosted}</p>
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </Col>
            <Col md={4}>
              <p className="lead"><strong><i className="fa fa-info-circle fa-fw"></i> About Promoter</strong></p>
              <p className="text-center">
                <Image src="./uploads/placeholder.png" roundedCircle style={{width: 180, height: 'auto'}}></Image>
              </p>
              <p className="text-center text-primary lead"><strong>{userPosted}</strong></p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
  render() {
    const { loading, travel } = this.props.travel;
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

// import React, { Component } from 'react';
// import { Container, Card, Image, Button, Row, Col, Carousel, CarouselItem } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { getTravelByID } from '../../actions/travelActions';


// class TravelPost extends Component {
//   componentDidMount() {
//     if(this.props.match.params.id !== "") {
//       this.props.getTravelByID(this.props.match.params.id);
//     }
//     else {
//       this.props.history.push('/home');
//     }
//   }
//   displayPost() {
//     const { travel } = this.props.travel;
//     console.log(travel.photos);
//     return (
//       <Card>
//         <Card.Body>
//           <p className="lead text-primary">{travel.name}</p>
//         </Card.Body>
//       </Card>
//     )
//   }
//   render() {
//     const { travel, loading } = this.props.travel;
//     console.log(loading);
//     return (
//       <Container>
//       {loading ? 
//         <p className="text-center lead"><i className="fa fa-spinner fa-fw fa-pulse"></i> Loading...</p>
//         :
//         this.displayPost()
//         }
//       </Container>
//     )
//   }
// }

// TravelPost.propTypes = {
//   getTravelByID: PropTypes.func.isRequired,
//   travel: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   travel: state.travel,
// });

// export default connect(mapStateToProps, { getTravelByID })(TravelPost);