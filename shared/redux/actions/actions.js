import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function addEvents(events) {
  return {
    type: ActionTypes.ADD_EVENTS,
    events,
  };
}

export function fetchEvents() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getEvents`)
      .then((response) => response.json())
      .then((response) => dispatch(addEvents(response.events)));
  };
}

export function addEvent(event) {
  return {
    type: ActionTypes.ADD_EVENT,
    eventId: event.eventId,
    title: event.title,
    memo: event.memo,
    dates: event.dates,
    members: event.members,
    _id: event._id,
  };
}

export function changeSelectedEvent(eventId) {
  return {
    type: ActionTypes.CHANGE_SELECTED_EVENT,
    eventId,
  };
}

export function addEventRequest(event) {
  return (dispatch) => {
    fetch(`${baseURL}/api/addEvent`, {
      method: 'post',
      body: JSON.stringify({
        event: {
          eventId: event.eventId,
          title: event.title,
          memo: event.memo,
          dates: event.dates,
          members: event.members,
          _id: event._id,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(addEvent(res.event)));
  };
}

export function addSelectedEvent(event) {
  console.log('addSelectedEvent');
  return {
    type: ActionTypes.ADD_SELECTED_EVENT,
    event,
  };
}

export function getEventRequest(eventId) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getEvent/${eventId}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => response.json())
      .then(res => dispatch(addSelectedEvent(res.event)));
  };
}

export function deleteEvent(event) {
  return {
    type: ActionTypes.DELETE_EVENT,
    event,
  };
}

export function deleteEventRequest(event) {
  return (dispatch) => {
    fetch(`${baseURL}/api/deletePost/${event.eventId}`)
      .then(() => dispatch(deletePost(post)));
  };
}

export function showAddForm(form) {
  return {
    type: ActionTypes.SHOW_ADD_FORM,
    form,
  };
}
