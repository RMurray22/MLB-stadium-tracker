const Stadium = require("./stadium");
const User = require("./user");
const Team = require("./team");

Stadium.hasOne(Team, {
    foreignKey: 'stadium_id',
});
Team.belongsTo(Stadium, {
    foreignKey: 'stadium_id',
});

User.hasOne(Team, {
  foreignKey: "user_favorite_team",
});
Team.hasMany(User, {
  foreignKey: "user_favorite_team",
});

module.exports = { Stadium, User, Team };
