const router = require('express').Router();
const { Events, User, Preference } = require('../models');
const withAuth = require('../utils/auth');

// Two steps so that the loading screen is rendered when the application starts
// The home page is then rendered second

router.get('/', (req, res) => {
    // if (req.session.logged_in) {
    //     res.render('homepage', {  
    //         logged_in: req.session.logged_in 
    //       });
    //     return;
    //   }
    //   res.redirect('/login');

    try {
      // res.render('homepage');
      res.render('loading');
    } catch (err) {
      console.log(err);
    }
});

router.get('/home', (req, res) => {
  // if (req.session.logged_in) {
  //     res.render('homepage', {  
  //         logged_in: req.session.logged_in 
  //       });
  //     return;
  //   }
  //   res.redirect('/login');

  try {
    res.render('homepage', {logged_in: req.session.logged_in});
  } catch (err) {
    console.log(err);
  }
});

// New routes to POST data from SpaceX to the server (and ultimately to the database)

router.post('/api/events', async (req, res) => {
  try {
    const newEvent = await Events.create({
      ...req.body
    });
    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.get('/api/events', async (req, res) => {
  try {
    const allEvents = await Events.findAll();
    res.status(200).json(allEvents);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.delete('/api/events/:id', async (req, res) => {
  try {
    const deletedEvent = await Events.destroy(
      { where: { id: req.params.id, } });

    res.status(200).json({ message: 'The event was successfully deleted!' });
    console.log('\n', "The category was successfully deleted!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

// END EVENT ROUTES

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Preference,
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;