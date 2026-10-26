import * as commentRepository from "../repositories/comment.repository.js";

export const createComment = async (data) => {
  return await commentRepository.createComment(data);
};

export const getAllComments = async () => {
  return await commentRepository.getAllComments();
};

export const findComments = async (postId) => {
  return await commentRepository.getComments(postId);
};
