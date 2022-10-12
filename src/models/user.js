const {Schema, model} = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'El name es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  avatar: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
})

UserSchema.methods.toJSON = function () {
  const {__v, password, _id, ...user} = this.toObject()
  user.uid = _id
  return user
}

module.exports = model('User', UserSchema)
