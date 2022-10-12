const {Schema, model} = require('mongoose')

const EventSchema = Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
  },
  backgroundColor: {
    type: Object,
    required: [true, 'El color es obligatorio'],
  },
  date: {
    type: Date,
    required: [true, 'La fecha es obligatoria'],
  },
  startTime: {
    type: String,
    required: [true, 'La hora inicial es obligatoria'],
  },
  endTime: {
    type: String,
    required: [true, 'La hora final es obligatoria'],
  },
  location: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

EventSchema.methods.toJSON = function () {
  const {__v, _id, status, ...event} = this.toObject()
  event.id = _id
  return event
}

module.exports = model('Event', EventSchema)
