const {response, request} = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const checkJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición',
    })
  }

  try {
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

    // leer el user que corresponde al uid
    const user = await User.findById(uid)

    if (!user) {
      return res.status(401).json({
        msg: 'Token no válido - user no existe DB',
      })
    }

    // Verificar si el uid tiene status true
    if (!user.status) {
      return res.status(401).json({
        msg: 'Token no válido - user con status: false',
      })
    }

    req.user = user
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Token no válido',
    })
  }
}

module.exports = {
  checkJWT,
}
