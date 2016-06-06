import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventId: { type: 'String', required: true },
  title: { type: 'String', required: true },
  memo: { type: 'String', required: false },
  dates: { type: [String], required: true },
  members: [{
    name: { type: 'String' },
    schedule: { type: [Number] },
  }],
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Event', eventSchema);
