const {User, Event} = require('../models')

const checkEmail = async (email = '') => {
  // Verificar si el email existe
  const isEmail = await User.findOne({email})
  if (isEmail) {
    throw new Error(`El email: ${email}, ya está registrado`)
  }
}

const checkUserByID = async (id) => {
  // Verificar si el email existe
  const isUser = await User.findById(id)
  if (!isUser) {
    throw new Error(`El id no existe ${id}`)
  }
}
const checkEventByID = async (id) => {
  // Verificar si el email existe
  const isEvent = await Event.findById(id)
  if (!isEvent) {
    throw new Error(`El id no existe ${id}`)
  }
}
module.exports = {
  checkEmail,
  checkUserByID,
  checkEventByID,
}
