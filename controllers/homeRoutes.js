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