const router = require('express').Router();
const { Game, User, Stadium } = require('../../models');

router.get('/', async (req, res) => {
    // return a list of all games
    try{
      const gameData = await Game.findAll({
        include: [{ model: User}, { model: Stadium }]
      });
      res.status(200).json(gameData);
    } catch (err){
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    // return a single game
    try{
        const gameData = await Game.findByPk(req.params.id, {
            include: [{ model: User}, { model: Stadium }]
        });
        res.status(200).json(stadiumData);
    } catch (err){
        res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const gameData = await Game.create(req.body);
      res.status(200).json(gameData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;