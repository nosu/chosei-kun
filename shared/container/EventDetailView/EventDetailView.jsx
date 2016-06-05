import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Helmet from 'react-helmet';

class EventDetailView extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
  }

  handleClick() {
    this.setState({
      showAddEvent: true,
    });
  }

  handleLogoClick() {
    this.props.dispatch(Actions.fetchEvents());
  }

  render() {
    return (
      <div>
        <Helmet title={this.props.event.title} />

        <Header onClick={function noop() {}} handleLogoClick={this.handleLogoClick}/>
        <div className="container">
          <div className="single-event post-detail">
            <h3 className="post-title">{this.props.post.title}</h3>
            <p className="author-name">By {this.props.post.name}</p>
            <p className="post-desc">{this.props.post.content}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

EventDetailView.need = [(params) => {
  return Actions.getEventRequest.bind(null, params.eventId)();
}];

EventDetailView.contextTypes = {
  router: React.PropTypes.object,
};

EventDetailView.propTypes = {
  event: PropTypes.shape({
    eventId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // memo: PropTypes.string.isRequired,
    dates: PropTypes.array.isRequired,
    members: PropTypes.array.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    event: (store.event),
  };
}

export default connect(mapStateToProps)(EventDetailView);
