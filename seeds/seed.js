const sequelize = require('../config/connection');
const { User, Stadium, Team } = require('../models');

const userSeeds = require('./userSeeds.json');
const teamSeeds = require('./teamSeeds.json');
const stadiumSeeds = require('./stadiumSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const stadiums = await Stadium.bulkCreate(stadiumSeeds);

  const teams = await Team.bulkCreate(teamSeeds);
  
  const users = await User.bulkCreate(userSeeds);

  
  

  process.exit(0);
};

seedDatabase();
