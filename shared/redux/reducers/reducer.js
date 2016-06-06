import * as ActionTypes from '../constants/constants';

const initialState = { events: [], event: null, form: null };

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
        events: state.events.filter((event) => event.eventId !== action.event.eventId),
      };

    case ActionTypes.SHOW_ADD_FORM :
      return {
        form: "ADD_FORM",
        event: state.event,
        events: state.events,
      };

    case ActionTypes.SHOW_UPDATE_FORM :
      return {
        form: 'UPDATE_FORM',
        event: state.event,
        events: state.events,
      };

    case ActionTypes.HIDE_FORM :
      return {
        form: null,
        event: state.event,
        events: state.events,
      };

    default:
      return state;
  }
};

export default eventReducer;
