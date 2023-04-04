const sequelize = require('../config/connection');
const { Stadium, Team, User } = require('../models');

const stadiumSeeds = require('./stadiumSeeds.json');
const teamSeeds = require('./teamSeeds.json');
const userSeeds = require('./userSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const stadiums = await Stadium.bulkCreate(stadiumSeeds);

  const teams = await Team.bulkCreate(teamSeeds);
    
  process.exit(0);
};

seedDatabase();
