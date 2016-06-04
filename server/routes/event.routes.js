import { Router } from 'express';
import * as EventController from '../controllers/event.controller';
const router = new Router();

// Get all Events
router.route('/getEvents').get(EventController.getEvents);

// Get one event by cuid
router.route('/getEvent/:eventId').get(EventController.getEvent);

// Add a new Event
router.route('/addEvent').post(EventController.addEvent);

// Delete a Event
router.route('/deleteEvent/:eventId').get(EventController.deleteEvent);

export default router;
