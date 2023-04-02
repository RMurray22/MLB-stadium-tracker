const router = require('express').Router();
const { User, Stadium } = require('../../models');

router.get('/', async (req, res) => {
    // return a list
    try{
      const stadiumData = await Stadium.findAll({
        order: [["name", "ASC"]],
      });
      res.status(200).json(stadiumData);
    } catch (err){
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    // return a single team
    try{
        const stadiumData = await Stadium.findByPk(req.params.id);
        res.status(200).json(stadiumData);
    } catch (err){
        res.status(500).json(err);
    }
  });

  module.exports = router;