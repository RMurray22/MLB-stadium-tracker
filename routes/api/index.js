const router = require("express").Router();
const stadiumRoutes = require("./stadiumRoutes");
const userRoutes = require("./userRoutes");
const teamRoutes = require("./teamRoutes")

router.use("/stadiums", stadiumRoutes);
router.use("/users", userRoutes);
router.use("/teams", teamRoutes);

module.exports = router;
