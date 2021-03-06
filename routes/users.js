const router = require('express').Router();
const ctrl = require('../controllers');

// routes
router.get('/', ctrl.users.index);
router.get('/:id', ctrl.users.show);
router.get('/login/:email', ctrl.users.loginShow);
router.post('/', ctrl.users.create);
router.put('/:id', ctrl.users.update);
router.delete('/:id', ctrl.users.destroy);

module.exports = router;