const foodRepository = require("../repositories/foodRepository");

exports.createFood = async (userId, data) => {
  return await foodRepository.create({ ...data, userId });
};

exports.getFoodsByUser = async (userId) => {
  return await foodRepository.listByUser(userId);
};

exports.updateFood = async (foodId, userId, data) => {
  const food = await foodRepository.findById(foodId);

  if (!food) throw new Error("Comida no encontrada");
  if (food.userId.toString() !== userId) throw new Error("No autorizado");

  return foodRepository.update(foodId, data);
};

exports.deleteFood = async (foodId, userId) => {
  const food = await foodRepository.findById(foodId);

  if (!food) throw new Error("Comida no encontrada");
  if (food.userId.toString() !== userId) throw new Error("No autorizado");

  return foodRepository.delete(foodId);
};
