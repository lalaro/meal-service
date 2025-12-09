const foodService = require("../services/foodService");

exports.createFood = async (req, res) => {
  try {
    const food = await foodService.createFood(req.userId, req.body);
    res.json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lista las comidas del usuario autenticado
exports.getFoods = async (req, res) => {
  try {
    const foods = await foodService.getFoodsByUser(req.userId);
    res.json(foods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
