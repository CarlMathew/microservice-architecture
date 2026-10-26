import express from "express";

import {
  createComment,
  getAllComments,
  getComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("", createComment);

router.get("", getAllComments);

router.get("/:postId/comment", getComments);

export default router;
