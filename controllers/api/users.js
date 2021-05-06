const router = require('express').Router();
const { User, Preference } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    const user = userData.get({ plain: true });
    const prefData = await Preference.create({
      user_id: user.id,
      spaceX: false,
      iss: false,
      snapi: false,
    });
    const pref = prefData.get({ plain: true });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.render('loading');
  } else {
    res.status(404).end();
  }
});

router.put('/:user_id', async (req, res) => {
  try {
    const userData = await User.update(req.body,
      {
        where: {
          id: req.params.user_id,
        },
      }
    );

    if (!userData[0]) {
      res.status(404).json({message: "No user with this id!"});
    }
    
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;


