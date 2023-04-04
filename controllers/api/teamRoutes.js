const router = require('express').Router();
const { Team, Stadium } = require('../../models');

router.get('/', async (req, res) => {
    // return a list
    try{
      const teamData = await Team.findAll({
        order: [["Location", "ASC"],["Name", "ASC"]],
        include: [{ model: Stadium}]
      });
      res.status(200).json(teamData);
    } catch (err){
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    // return a single team
    try{
        const teamData = await Team.findByPk(req.params.id, {
            include: [{ model: Stadium}]
        });
        res.status(200).json(teamData);
    } catch (err){
        res.status(500).json(err);
    }
  });

  module.exports = router;