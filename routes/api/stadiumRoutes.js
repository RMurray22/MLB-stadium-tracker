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
