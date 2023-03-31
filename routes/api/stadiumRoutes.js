const router = require("express").Router();
const Stadium = require("../../models/stadium");
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
  const stadiumData = await Stadium.findall();

  return res.json(stadiumData);
});

router.post("/", async (req, res) => {
  const stadiumData = await Stadium.create(req.body);

  return res.json(stadiumData);
});

router.get("/:id", async (req, res) => {
  try {
    const stadiumData = await Stadium.findByPk(req.params.id);
    if (!stadiumData) {
      res.status(404).json({ message: "No stadium with this id!" });
      return;
    }
    res.status(200).json(stadiumData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;