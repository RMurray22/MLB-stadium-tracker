const router = require('express').Router();
const { User, Team, Stadium } = require('../../models');

router.get('/', async (req, res) => {
    // return a list
    try{
      const teamData = await Team.findAll();
      res.status(200).json(teamData);
    } catch (err){
      res.status(500).json(err);
    }
  });

  module.exports = router;