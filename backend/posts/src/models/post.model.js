import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Post = database.define(
  "posts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "posts_tbl",
    timestamps: true,
  },
);

export default Post;
