const router = require('express').Router();

const userRoutes = require('./users');
router.use('/users', userRoutes);

const eventRoutes = require('./events');
router.use('/events', eventRoutes);

module.exports = router;
