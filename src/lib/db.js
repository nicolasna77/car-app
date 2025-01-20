import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false,
  }
);

// Test de la connexion
try {
  await sequelize.authenticate();
  console.log("Connection à la base de données établie avec succès. 🎉");
} catch (error) {
  console.error("Impossible de se connecter à la base de données:", error);
}

export default sequelize;
