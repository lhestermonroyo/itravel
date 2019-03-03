import React, { Component } from 'react';
import { Card, Button, Image, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTravels } from '../../actions/travelActions';

class TravelFeed extends Component {
  componentDidMount() {
    this.props.getTravels();
  }
  mapTravel() {
    const { travels } = this.props.travel;
    return travels.map(travel => {
      const { _id, name, timestamp, userPosted, description, location, photos } = travel;
      return (
        <div key={_id}>
          <Card className="mb-2">
            <Card.Body>
              <Button className="float-right" variant="light"><i className="fa fa-ellipsis-v fa-fw"></i></Button>
              <Link to={`/travel/${_id}`} style={{textDecoration: 'none'}}>
                <p className="text-primary" style={{marginBottom: -4}}>
                  <span className="lead"><strong>{name}</strong></span> <span>(<i className="fa fa-map-marker-alt fa-fw"></i>{location})</span>
                </p>
              </Link>
              <small className="text-secondary"><i className="fa fa-clock fa-fw"></i> {new Date(timestamp).toLocaleTimeString()} - {new Date(timestamp).toDateString()} &bull; <i className="fa fa-user-circle fa-fw"></i> {userPosted}</small>
              <div style={{marginBottom: -7}} className="mt-3" dangerouslySetInnerHTML={ description.length >= 184 ? {__html: description.substring(0, 184).trim()+'...'} : { __html: description } }>
              </div>
              <Link className="btn btn-primary mb-3" to={`/travel/${_id}`}>View Full Post <i className="fa fa-chevron-right fa-fw"></i></Link>
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
            </Card.Body>
            <Card.Footer>
              <Button variant="light"><i className="fa fa-star fa-fw"></i> Rate It</Button>
              <Button variant="light"><i className="fa fa-comment-alt fa-fw"></i> Comment</Button>
              <Button variant="light"><i className="fa fa-bookmark fa-fw"></i> Save</Button>
            </Card.Footer>
          </Card>
        </div>
      )
    })
  }
  render() {
    const { loading } = this.props.travel;
    return (
      <div>
        {loading ? 
          <p className="text-center lead"><i className="fa fa-spinner fa-fw fa-pulse"></i> Loading...</p>
          :
          this.mapTravel()
        }
      </div>
    )
  }
}

TravelFeed.propTypes = {
  getTravels: PropTypes.func.isRequired,
  travel: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  travel: state.travel,
})

export default connect(mapStateToProps, { getTravels })(TravelFeed);