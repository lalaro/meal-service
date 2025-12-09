const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

dotenv.config();

const app = express();
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Importar rutas SOLO del microservicio de comidas
const foodRoutes = require("./src/routes/foodRoutes");
app.use("/api/foods", foodRoutes);

// Prueba
app.get("/", (req, res) => {
  res.send("Meal-service funcionando");
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Meal-service en puerto ${PORT}`));
