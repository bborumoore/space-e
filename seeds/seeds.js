const sequelize = require('../config/connection');
const { User, Preference } = require('../models');

const userData = require('./userData.json');
const prefData = require('./preferences.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const preferences of prefData) {
    await Preference.create({
      ...preferences,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
