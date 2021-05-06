const router = require('express').Router();
const { Events, User, Preference } = require('../models');
const withAuth = require('../utils/auth');

// Two steps so that the loading screen is rendered when the application starts
// The home page is then rendered second

router.get('/', (req, res) => {
    try {
      res.render('loading', {logged_in: req.session.logged_in});
    } catch (err) {
      console.log(err);
    }
});

router.get('/home', withAuth, (req, res) => {
  try {
    res.render('homepage', {logged_in: req.session.logged_in});
  } catch (err) {
    console.log(err);
  }
});

// Routes for the News page, ISS page, and POTD page

router.get('/news', withAuth, (req, res) => {
  try {
    res.render('news', {logged_in: req.session.logged_in})
  } catch (err) {
    console.log(err);
  }
})

router.get('/iss', withAuth, (req, res) => {
  try {
    res.render('iss', {logged_in: req.session.logged_in})
  } catch (err) {
    console.log(err);
  }
})

router.get('/potd', withAuth, (req, res) => {
  try {
    res.render('potd', {logged_in: req.session.logged_in})
  } catch (err) {
    console.log(err);
  }
})

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

    res.render('homepage', {
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
    res.redirect('/home');
    return;
  }

  res.render('login');
});

router.get('/logout', (req, res) => {
   res.render('login');
});



module.exports = router;