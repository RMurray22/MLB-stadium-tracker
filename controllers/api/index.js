const router = require("express").Router();
const userRoutes = require("./userRoutes");
const teamRoutes = require("./teamRoutes");
const stadiumRoutes = require("./stadiumRoutes");

router.use("/users", userRoutes);
router.use("/teams", teamRoutes);
router.use("/stadiums", stadiumRoutes);

module.exports = router;
