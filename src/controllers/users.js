const {response, request} = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const usersGet = async (req = request, res = response) => {
  const {limite = 5, desde = 0} = req.query
  const query = {status: true}

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(desde)).limit(Number(limite)),
  ])

  res.json({
    total,
    users,
  })
}
const userGet = async (req = request, res = response) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(403).json({
      msg: 'Token must be provided',
    })
  }
  const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
  const query = {status: true, _id: uid}
  const user = await User.findOne(query)
  res.json(user)
}

const usersPost = async (req, res = response) => {
  const {name, email, password, avatar} = req.body
  const user = new User({name, email, password, avatar})

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  // Guardar en BD
  await user.save()

  res.json({
    user,
  })
}

const usersPut = async (req, res = response) => {
  const {id} = req.params
  const {_id, password, google, email, ...resto} = req.body

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    resto.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, resto, {new: true})

  res.json(user)
}

const usersDelete = async (req, res = response) => {
  const {id} = req.params
  const user = await User.findByIdAndUpdate(id, {status: false})

  res.json(user)
}

module.exports = {
  usersGet,
  userGet,
  usersPost,
  usersPut,
  usersDelete,
}
