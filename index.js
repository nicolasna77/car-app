import express from "express";
import bodyParser from "body-parser";
import sequelize from "./src/lib/db.js";
import Car from "./models/Car.js";
import cors from "cors";

const app = express();
const PORT = process.env.NEXT_PUBLIC_API_PORT;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync({ force: true }).then(() => {
  console.log("Database sync ✅");
});

// Create a car
app.post("/cars", async (req, res) => {
  const { model, speed, features } = req.body;

  if (!model || !speed) {
    return res
      .status(400)
      .send({ message: "Le modèle et la vitesse sont requis." });
  }

  try {
    const car = await Car.create({ model, speed, features });
    res.status(201).send(car);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erreur lors de la création de la voiture.", error });
  }
});

// Get all cars
app.get("/cars", async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.status(200).send(cars);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erreur lors de la récupération des voitures.", error });
  }
});

// Update a car
app.put("/cars/:id", async (req, res) => {
  const { id } = req.params;
  const { model, speed, features } = req.body;

  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).send({ message: "Voiture non trouvée." });
    }

    await car.update({ model, speed, features });
    res.status(200).send(car);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erreur lors de la mise à jour de la voiture.", error });
  }
});

// Delete a car
app.delete("/cars/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).send({ message: "Voiture non trouvée." });
    }

    await car.destroy();
    res.status(200).send({ message: "Voiture supprimée avec succès." });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erreur lors de la suppression de la voiture.", error });
  }
});

// Calculate time
app.post("/calculate-time", async (req, res) => {
  const { distance, model } = req.body;

  if (!distance || !model) {
    return res.status(400).send({ message: "Distance et modèle sont requis." });
  }

  try {
    const car = await Car.findOne({ where: { model } });
    if (!car) {
      return res.status(404).send({ message: "Voiture non trouvée." });
    }

    const timeInHours = distance / car.speed;
    let formattedTime;

    if (timeInHours < 1) {
      const timeInMinutes = Math.round(timeInHours * 60);
      formattedTime = `${timeInMinutes} minutes`;
    } else {
      formattedTime = `${timeInHours.toFixed(2)}h`;
    }

    res.status(200).send({
      model,
      distance,
      time: formattedTime,
    });
  } catch (error) {
    res.status(500).send({ message: "Erreur lors du calcul du temps.", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
