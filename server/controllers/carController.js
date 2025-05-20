const Car = require("../models/Car");

exports.getCars = async (req, res) => {
  const cars = await Car.findAll();
  res.json(cars);
};

exports.addCar = async (req, res) => {
  const car = await Car.create(req.body);
  res.json(car);
};

// Assuming you have a Sequelize model called Car

exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    // Find car by primary key (id)
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Delete the car
    await car.destroy();

    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
