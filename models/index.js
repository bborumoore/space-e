// import models
const Preference = require('./Preference');
const Comments = require('./Comments');
const User = require('./User');
const Events = require('./Events');

// Preferences belongs to One User
Preference.belongsTo(User, {
  foreignKey: 'user_id',
});

// User have many preferences
User.hasMany(Preference, {
  foreignKey: 'user_id'
});

// Comments belongs to one User
Comments.belongsTo(User, {
    foreignKey: 'user_id',
});
  
// User has many comments
User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// Comments belongs to Evenets
Comments.belongsTo(Events, {
    foreignKey: 'event_id',
});
  
// Events can have many comments
Events.hasMany(Comments, {
    foreignKey: 'event_id',
    onDelete: 'CASCADE',
});

Events.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Events, {
    foreignKey: 'event_id',
    onDelete: 'CASCADE'
})

module.exports = {
  Preference,
  Comments,
  User,
  Events
};
