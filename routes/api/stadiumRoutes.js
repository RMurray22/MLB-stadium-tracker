const router = require("express").Router();
const Stadium = require("../../models/stadium");

router.get("/", async (req, res) => {
  const stadiumData = await Stadium.findall();

  return res.json(stadiumData);
});

router.post("/", async (req, res) => {
  const stadiumData = await Stadium.create(req.body);

  return res.json(stadiumData);
});

router.get();
