import expect from 'expect';
import eventReducer from '../redux/reducers/reducer';
import deepFreeze from 'deep-freeze';
import * as ActionTypes from '../redux/constants/constants';

describe('reducer tests', () => {
  it('action ADD_EVENT is working', () => {
    const stateBefore = { events: ['foo'], event: null };
    const stateAfter = { events: [{
      title: 'first event',
      memo: 'Hello world!',
      dates: [],
      members: [],
      _id: null,
      eventId: null,
    }, 'foo'], event: null };

    const action = {
      type: ActionTypes.ADD_EVENT,
      title: 'first event',
      memo: 'Hello world!',
      dates: [],
      members: [],
      _id: null,
      eventId: null,
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(stateAfter).toEqual(eventReducer(stateBefore, action));
  });

  it('action ADD_SELECTED_EVENT is working', () => {
    const stateBefore = {
      events: [{
        title: 'first event',
        memo: 'Hello world!',
        dates: [],
        members: [],
        _id: null,
        eventId: null,
      }],
      selectedEvent: null,
    };

    const stateAfter = {
      events: [{
        title: 'first event',
        memo: 'Hello world!',
        dates: [],
        members: [],
        _id: null,
        eventId: null,
      }],
      event: {
        title: 'first event',
        memo: 'Hello world!',
        dates: [],
        members: [],
        _id: null,
        eventId: null,
      },
    };

    const action = {
      type: ActionTypes.ADD_SELECTED_EVENT,
      event: {
        title: 'first event',
        memo: 'Hello world!',
        dates: [],
        members: [],
        _id: null,
        eventId: null,
      },
    };

    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(stateAfter).toEqual(eventReducer(stateBefore, action));
  });
});
