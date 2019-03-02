import React, { Component } from 'react';
import { Card, Button, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTravel } from '../../actions/travelActions';

class TravelFeed extends Component {
  componentDidMount() {
    this.props.getTravel();
  }
  mapTravel() {
    const { travel } = this.props.travel;
    return travel.map(singleTravel => {
      const { _id, name, timestamp, userPosted, description, photos } = singleTravel;
      return (
        <Card className="mb-2">
          <Card.Body>
            <Button className="float-right" variant="light"><i className="fa fa-ellipsis-v fa-fw"></i></Button>
            <p className="lead text-primary" style={{marginBottom: -4}}><strong>{name}</strong></p>
            <small className="text-secondary"><i className="fa fa-clock fa-fw"></i> {new Date(timestamp).toLocaleTimeString()} - {new Date(timestamp).toDateString()} &bull; <i className="fa fa-user-circle fa-fw"></i> {userPosted}</small>
            <p className="mt-3">{description.substring(0, 200).trim()}... <Link to={`/travel/${_id}`}>View Full Post</Link></p>
            {photos.map((photo, i) => i === 0 ?  
              <Link to={`/travel/${_id}`}>
                <Image src={photo} width="100%"></Image>
              </Link>
              : 
              null
            )}
          </Card.Body>
          <Card.Footer>
            <Button variant="light" title="Rate It"><i className="fa fa-star fa-fw fa-2x"></i></Button>
            <Button variant="light" title="Comment"><i className="fa fa-comment-alt fa-fw fa-2x"></i></Button>
            <Button variant="light" title="Save"><i className="fa fa-bookmark fa-fw fa-2x"></i></Button>
          </Card.Footer>
        </Card>
      )
    })
  }
  render() {
    const { loading, travel } = this.props.travel;
    console.log(loading);
    console.log(travel);
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
  getTravel: PropTypes.func.isRequired,
  travel: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  travel: state.travel,
})

export default connect(mapStateToProps, { getTravel })(TravelFeed);