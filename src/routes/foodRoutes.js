const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const foodController = require("../controllers/foodController");

// Rutas del microservicio de comidas
router.get("/", authMiddleware, foodController.getFoods);
router.post("/", authMiddleware, foodController.createFood);

module.exports = router;
