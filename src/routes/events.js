const {Router} = require('express')
const {check} = require('express-validator')

const {checkJWT, checkFields} = require('../middlewares')

const {
  eventPost,
  eventsGet,
  eventGet,
  eventPut,
  eventDelete,
} = require('../controllers/events')
const {checkEventByID} = require('../helpers/db-validators')

const router = Router()

/**
 * {{url}}/api/events
 */

//  Obtener todas las events - publico
router.get('/', checkJWT, eventsGet, checkFields)

// Obtener una categoria por id - publico
router.get(
  '/:id',
  [
    checkJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(checkEventByID),
    checkFields,
  ],
  eventGet,
)

// Crear categoria - privado - cualquier persona con un token válido
router.post(
  '/',
  [
    checkJWT,
    check('title', 'El title es obligatorio').not().isEmpty(),
    check('category', 'La categoría es obligatoria').not().isEmpty(),
    check('backgroundColor', 'El color es obligatorio').not().isEmpty(),
    check('date', 'La fecha es obligatoria').not().isEmpty(),
    check('startTime', 'La hora inicial es obligatoria').not().isEmpty(),
    check('endTime', 'La hora final es obligatoria').not().isEmpty(),
    checkFields,
  ],
  eventPost,
)

// Actualizar - privado - cualquiera con token válido
router.put(
  '/:id',
  [
    checkJWT,
    check('title', 'El title es obligatorio').not().isEmpty(),
    check('id').custom(checkEventByID),
    checkFields,
  ],
  eventPut,
)

// Borrar una categoria - Admin
router.delete(
  '/:id',
  [
    checkJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(checkEventByID),
    checkFields,
  ],
  eventDelete,
)

module.exports = router
