const {Router} = require('express')
const {check} = require('express-validator')

const {checkFields, checkJWT} = require('../middlewares')

const {checkEmail, checkUserByID} = require('../helpers/db-validators')

const {
  usersGet,
  userGet,
  usersPut,
  usersPost,
  usersDelete,
} = require('../controllers/users')

const router = Router()

router.get('/', usersGet)
router.get('/user', userGet)
router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(checkUserByID),
    checkFields,
  ],
  usersPut,
)

router.post(
  '/',
  [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({
      min: 6,
    }),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(checkEmail),
    checkFields,
  ],
  usersPost,
)

router.delete(
  '/:id',
  [
    checkJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(checkUserByID),
    checkFields,
  ],
  usersDelete,
)

module.exports = router
