import * as ActionTypes from '../constants/constants';

const initialState = { events: [], event: null };

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_EVENT :
      return {
        events: [{
          title: action.title,
          memo: action.memo,
          dates: action.dates,
          members: action.members,
          eventId: action.eventId,
          _id: action._id,
        }, ...state.events],
        event: state.event };

    case ActionTypes.ADD_EVENTS :
      return {
        events: action.events,
        event: state.event,
      };

    case ActionTypes.CHANGE_SELECTED_EVENT :
      return {
        events: state.events,
        eventId: action.eventId,
      };

    case ActionTypes.ADD_SELECTED_EVENT :
      return {
        event: action.event,
        events: state.events,
      };

    case ActionTypes.DELETE_EVENT :
      return {
        posts: state.events.filter((event) => event.eventId !== action.event.eventId),
      };

    default:
      return state;
  }
};

export default eventReducer;
