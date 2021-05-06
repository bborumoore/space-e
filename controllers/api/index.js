const router = require('express').Router();

const userRoutes = require('./users');
const prefRoutes = require('./preferences');

router.use('/users', userRoutes);
router.use('/preferences', prefRoutes);

const eventRoutes = require('./events');
router.use('/events', eventRoutes);

module.exports = router;
