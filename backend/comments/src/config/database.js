import { Sequelize } from "sequelize";

const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

export default database;
