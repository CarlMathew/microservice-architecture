import * as commentService from "../services/comment.service.js";

export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;

    if (!comment) {
      return res.status(400).json({
        message: "Please provide a comment",
      });
    }

    if (!postId) {
      return res.status(400).json({
        message: "Please select a post to comment.",
      });
    }

    const comments = await commentService.createComment({
      postId,
      comment,
    });

    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await commentService.getAllComments();

    if (comments.length == 0) {
      return res.status(404).json({ message: "No comments Found on the post" });
    }

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await commentService.findComments(postId);

    if (comments.length == 0) {
      return res.status(400).json({ message: "No Comments Found" });
    }

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
