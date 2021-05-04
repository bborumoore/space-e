const router = require('express').Router();
const { Events, User, Preference } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', updatePref(), (req, res) => {
    if (req.session.logged_in) {
        res.render('homepage', {  
            logged_in: req.session.logged_in 
          });
        return;
      }
      res.redirect('/login');
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
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