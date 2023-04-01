const router = require("express").Router();
const { User, Team, Stadium } = require("../../models");

router.get("/", async (req, res) => {
  const stadiumData = await Stadium.findall();

  return res.json(stadiumData);
});

router.post("/", async (req, res) => {
  const stadiumData = await Stadium.create(req.body);

  return res.json(stadiumData);
});

router.get();
