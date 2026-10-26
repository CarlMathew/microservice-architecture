import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Comment = database.define(
  "comments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    tableName: "comments_tbl",
    timestamps: true,
  },
);

export default Comment;
