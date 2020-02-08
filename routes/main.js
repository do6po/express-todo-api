const {Router} = require('express')
const router = Router()
const TodoController = new (require('../controllers/TodoController'))

router.get('/', (req, res) => TodoController.index(req, res))
router.post('/', (req, res) => TodoController.add(req, res))
router.put('/', (req, res) => TodoController.add(req, res))
router.delete('/', (req, res) => TodoController.add(req, res))

module.exports = router