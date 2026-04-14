const router = require('express').Router();
const { Events } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const allEvents = await Events.findAll({
      order: [['launch_start', 'ASC']]
    });
    res.status(200).json(allEvents);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const { launch_name, launch_start, launch_link } = req.body;

    if (!launch_name || !launch_start) {
      res.status(400).json({ message: 'launch_name and launch_start are required.' });
      return;
    }

    const newEvent = await Events.create({
      launch_name,
      launch_start,
      launch_link: launch_link || null
    });

    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedCount = await Events.destroy({
      where: { id: req.params.id }
    });

    if (!deletedCount) {
      res.status(404).json({ message: 'No event found with this id.' });
      return;
    }

    res.status(200).json({ message: 'The event was successfully deleted.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
