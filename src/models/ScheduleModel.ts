import mongoose from 'mongoose';

const { Schema } = mongoose;

const scheduleSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  typeId: {
    type: Number,
    required: true,
  },
  bgColor: {
    type: String,
    required: true,
  },
});

const Schedule = mongoose.model('Schedule', scheduleSchema, 'schedule');

export default Schedule;
