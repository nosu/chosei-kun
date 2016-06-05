import Event from '../models/event';
import cuid from 'cuid';
// import slug from 'slug';
import sanitizeHtml from 'sanitize-html';

export function getEvents(req, res) {
  Event.find().sort('-dateAdded').exec((err, events) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ events });
  });
}

export function addEvent(req, res) {
  if (!req.body.event.title || !req.body.event.dates) {
    return res.status(403).end();
  }

  const newEvent = new Event(req.body.event);

  // Let's sanitize inputs
  newEvent.title = sanitizeHtml(newEvent.title);

  newEvent.eventId = cuid();
  newEvent.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ event: saved });
  });
}

export function getEvent(req, res) {
  console.log('API getEvent req.params: ', req.params);
  const eventId = req.params.eventId;
  Event.findOne({ eventId: eventId }).exec((err, event) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ event });
  });
}

export function deleteEvent(req, res) {
  const eventId = req.params.eventId;
  Event.findOne({ eventId: eventId }).exec((err, event) => {
    if (err) {
      return res.status(500).send(err);
    }

    event.remove(() => {
      res.status(200).end();
    });
  });
}
