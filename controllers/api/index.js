const router = require("express").Router();
const userRoutes = require("./userRoutes");
<<<<<<< HEAD
// const projectRoutes = require("./projectRoutes");

router.use("/users", userRoutes);
// router.use("/projects", projectRoutes);
=======

router.use("/users", userRoutes);
>>>>>>> 38d5cf5aee74f2d1797fb77a36679c461376c8c6

module.exports = router;
