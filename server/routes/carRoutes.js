const express = require("express");
const { getCars, addCar, deleteCar  } = require("../controllers/carController");

const router = express.Router();

router.get("/", getCars);
router.post("/", addCar);
router.delete("/:id", deleteCar);

module.exports = router;
