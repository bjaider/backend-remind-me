const validaFields = require('../middlewares/check-fields')
const checkJWT = require('../middlewares/check-jwt')

module.exports = {
  ...validaFields,
  ...checkJWT,
}
