const router = require("express").Router();
const stadiums = require("./stadiumRoutes");

router.use("/stadium", stadiums);

module.exports = router;
