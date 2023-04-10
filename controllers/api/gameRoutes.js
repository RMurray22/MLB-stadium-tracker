const router = require('express').Router();
const { Game, User, Stadium } = require('../../models');

router.get('/', async (req, res) => {
    // return a list of all games
    try{
      const gameData = await Game.findAll();
      res.status(200).json(gameData);
    } catch (err){
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    // return game by id
    try{
      const gameData = await Game.findByPk(req.params.id);
      res.status(200).json(gameData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/user/:id', async (req, res) => {
    // return all games for a user
    try{
        const gameData = await Game.findAll( {
          where: { user_id: req.params.id}
        });
        res.status(200).json(gameData);
    } catch (err){
        res.status(500).json(err);
    }
  });

  router.post('/user/:id', async (req, res) => {
    try {
        const gameData = await Game.create({ 
          user_id: req.params.id, 
          stadium: req.body.stadiumID, 
        });
        res.status(200).json(gameData);
      } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const userGames = await Game.destroy({
        where: { user_id: req.params.id , stadium: req.body.stadiumID }
      });
      if (!userGames) {
        res.status(404).json({ message: 'No game found with this id!' });
        return;
      }
      res.status(200).json(userGames)
    }catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;