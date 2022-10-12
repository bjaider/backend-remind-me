const {Router} = require('express')
const {check} = require('express-validator')

const {checkFields} = require('../middlewares/check-fields')

const {login} = require('../controllers/auth')

const router = Router()

router.post(
  '/login',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    checkFields,
  ],
  login,
)

module.exports = router
