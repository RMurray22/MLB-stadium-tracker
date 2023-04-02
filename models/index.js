const Stadium = require("./stadium");
const Team = require("./team");
const User = require("./user");

Stadium.hasOne(Team, {
    foreignKey: 'home_stadium'
});

Team.hasMany(User, {
    foreignKey: "favorite_team",
    onDelete: "CASCADE"
  });

Team.belongsTo(Stadium, {
    foreignKey: 'home_stadium'
});

User.belongsTo(Team, {
  foreignKey: "favorite_team"
});

module.exports = { Stadium, Team, User };
