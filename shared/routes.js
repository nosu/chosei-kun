import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import EventContainer from './container/EventContainer/EventContainer';
import EventDetailView from './container/EventDetailView/EventDetailView';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={EventContainer} />
    <Route path="/event/:eventId" component={EventDetailView}/>
    {/* <Route path="*" component={NotFound}/> */}
  </Route>
);

export default routes;
