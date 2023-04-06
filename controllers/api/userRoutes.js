const router = require('express').Router();
const { User } = require('../../models');
const nodemailer = require("nodemailer");

router.post('/signup', async (req, res) => {
  try {
    const checkByEmail = await User.findOne({ where: { email: req.body.email }});
    const checkByUsername = await User.findOne({ where: { username: req.body.username }});
    if (checkByEmail){
      res.status(400).json({ message: 'An account with that email has already been created.'});
      return;
    } else if (checkByUsername){
      res.status(400).json({ message: 'That username has already been taken.'});
      return;
    } else {
    // Create new User
    const userData = await User.create(req.body);
        // send welcome email
    let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: 'clarissa.littel@ethereal.email',
      pass: 'yeJj7NMgk99Sbm1R9U'
    },
    });
    let info = await transporter.sendMail({
      from: '"Group 5" <admin@placeholder.com.com>', // sender address
      to: userData.email, 
      subject: "Thank you for signing up", // Subject line
      text: "Welcome to the MLB Stadium Tracker App", // plain text body
      html: "<hr>",
    });
    // save session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;


      res.status(200).json(userData);
    });
  }} catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, { where: { id: req.params.id }});
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;