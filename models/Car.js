import { DataTypes } from "sequelize";
import sequelize from "../src/lib/db.js";

const Car = sequelize.define("Car", {
  model: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  speed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  features: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

export default Car;
