import * as ActionTypes from '../constants/constants';

const initialState = { posts: [], post: null, events: [], event: null };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ActionTypes.ADD_POST :
    //   return {
    //     posts: [{
    //       name: action.name,
    //       title: action.title,
    //       content: action.content,
    //       slug: action.slug,
    //       cuid: action.cuid,
    //       _id: action._id,
    //     }, ...state.posts],
    //     post: state.post };
    //
    // case ActionTypes.CHANGE_SELECTED_POST :
    //   return {
    //     posts: state.posts,
    //     post: action.slug,
    //   };
    //
    // case ActionTypes.ADD_POSTS :
    //   return {
    //     posts: action.posts,
    //     post: state.post,
    //   };
    //
    // case ActionTypes.ADD_SELECTED_POST :
    //   return {
    //     post: action.post,
    //     posts: state.posts,
    //   };
    //
    // case ActionTypes.DELETE_POST :
    //   return {
    //     posts: state.posts.filter((post) => post._id !== action.post._id),
    //   };

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

export default postReducer;
