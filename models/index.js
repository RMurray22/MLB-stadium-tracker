const Stadium = require('./stadium');
const User = require('./user');
const Team = require('./team');

Team.hasOne(Stadium, {
    foreignKey: 'stadium_id',
});
Stadium.belongsTo(Team, {
    foreignKey: 'stadium_id',
});

User.hasOne(Team, {
    foreignKey: 'user_favorite_team',
});
Team.hasMany(User, {
    foreignKey: 'user_favorite_team',
});
