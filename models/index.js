const Team = require("./team");
const User = require("./user");
const Game = require("./game");
const Stadium = require("./stadium");


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

User.belongsToMany(Stadium, {
    through: {
        model: Game,
        unique: false,
    },
    as: 'game_location'
});

Stadium.belongsToMany(User, {
    through: {
        model: Game,
        unique: false
    },
    as: 'game_attendee'
});

module.exports = {  Stadium, Team, User, Game };
