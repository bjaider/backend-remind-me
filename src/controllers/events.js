const {response} = require('express')
const {Event} = require('../models')
const jwt = require('jsonwebtoken')
const eventsGet = async (req, res = response) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(403).json({
      msg: 'Token must be provided',
    })
  }
  const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
  const query = {status: true, user: {_id: uid}}
  const [total, events] = await Promise.all([
    Event.countDocuments(query),
    Event.find(query).populate('user', 'name'),
  ])

  res.json({
    total,
    events,
  })
}

const eventGet = async (req, res = response) => {
  const {id} = req.params
  const event = await Event.findById(id).populate('user', 'name')

  res.json(event)
}

const eventPost = async (req, res = response) => {
  const title = req.body.title.toUpperCase()
  const {status, ...body} = req.body
  const token = req.header('x-token')
  if (!token) {
    return res.status(403).json({
      msg: 'Token must be provided',
    })
  }
  const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

  // Generar la data a guardar
  const data = {
    title,
    user: uid,
    ...body,
  }

  const event = new Event(data)
  // Guardar DB
  await event.save()

  res.status(201).json(event)
}

const eventPut = async (req, res = response) => {
  const {id} = req.params
  const {status, user, ...data} = req.body

  data.title = data.title.toUpperCase()
  data.user = req.user._id

  const event = await Event.findByIdAndUpdate(id, data, {new: true}).populate(
    'user',
    'name',
  )

  res.json(event)
}

const eventDelete = async (req, res = response) => {
  const {id} = req.params
  const eventBorrada = await Event.findByIdAndUpdate(
    id,
    {status: false},
    {new: true},
  )

  res.json(eventBorrada)
}

module.exports = {
  eventPost,
  eventsGet,
  eventGet,
  eventPut,
  eventDelete,
}
