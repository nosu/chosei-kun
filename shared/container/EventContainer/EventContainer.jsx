import React, { PropTypes, Component } from 'react';
// import EventListView from '../EventListView/EventListView';
import EventCreateView from '../../components/EventCreateView/EventCreateView';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class EventContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showAddEvent: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.add = this.add.bind(this);
  }

  handleClick(e) {
    this.setState({
      showAddEvent: !this.state.showAddEvent,
    });

    e.preventDefault();
  }

  add(name, title, content) {
    this.props.dispatch(Actions.addEventRequest({ name, title, content }));
    this.setState({
      showAddEvent: false,
    });
  }

  componentDidMount() {
    if(this.props.posts.length === 0) {
      this.props.dispatch(Actions.fetchEvents());
    }
  }

  render() {
    return (
      <div>
        <Header onClick={this.handleClick} />
        <div className="container">
          <EventCreateView addEvent={this.add}
            showAddEvent={this.state.showAddEvent}/>
          <EventListView posts={this.props.posts}/>
        </div>
        <Footer />
      </div>
    );
  }
}

EventContainer.need = [() => { return Actions.fetchEvents(); }];
EventContainer.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    posts: store.posts,
  };
}

EventContainer.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(EventContainer);
