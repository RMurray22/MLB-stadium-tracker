const router = require("express").Router();
const { Stadium, User, Team } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const stadiumData = await Stadium.findAll({
      order: [["name", "ASC"]],
    });

    const stadiums = stadiumData.map((stadium) => stadium.get({ plain: true }));

    res.render("homepage", {
      stadiums,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Team }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/stadiums", async (req, res) => {
  try {
    const stadiumData = await Stadium.findAll({
      order: [["name", "ASC"]],
    });

    const stadiums = stadiumData.map((stadium) => stadium.get({ plain: true }));

    res.render("stadiums", {
      stadiums,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
