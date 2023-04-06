const sequelize = require('../config/connection');
const { Stadium, Team } = require('../models');

const stadiumSeeds = require('./stadiumSeeds.json');
const teamSeeds = require('./teamSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: false, alter: true });

  const stadiums = await Stadium.bulkCreate(stadiumSeeds);

  const teams = await Team.bulkCreate(teamSeeds);
    
  process.exit(0);
};

seedDatabase();
3