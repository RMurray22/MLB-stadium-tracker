const Stadium = require("./stadium");
const Team = require("./team");
const User = require("./user");

Stadium.hasOne(Team, {
    foreignKey: 'team_stadium',
    onDelete: "CASCADE"
});

Team.hasOne(User, {
    foreignKey: "user_favorite_team",
    onDelete: "CASCADE"
  });

Team.belongsTo(Stadium, {
    foreignKey: 'team_stadium',
    onDelete: 'CASCADE'
});

User.belongsTo(Team, {
  foreignKey: "user_favorite_team",
  onDelete: "CASCADE"
});

module.exports = { Stadium, Team, User };
