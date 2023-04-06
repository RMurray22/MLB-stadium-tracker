const router = require("express").Router();
const userRoutes = require("./userRoutes");
const teamRoutes = require("./teamRoutes");
const stadiumRoutes = require("./stadiumRoutes");
const gameRoutes = require('./gameRoutes')

router.use("/users", userRoutes);
router.use("/teams", teamRoutes);
router.use("/stadiums", stadiumRoutes);
router.use("/games", gameRoutes);

module.exports = router;