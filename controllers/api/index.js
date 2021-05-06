const router = require('express').Router();

const userRoutes = require('./users');
const prefRoutes = require('./preferences');

router.use('/users', userRoutes);
router.use('/preferences', prefRoutes);

module.exports = router;
