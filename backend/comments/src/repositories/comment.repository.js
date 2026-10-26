import Comment from "../models/comments.model.js";

const createComment = async (data) => {
  return await Comment.create(data);
};

const getAllComments = async () => {
  return await Comment.findAll();
};

const getComments = async (postId) => {
  const commentPerPost = await Comment.findAll({
    where: {
      postId: postId,
    },
  });

  return await commentPerPost;
};

export { createComment, getAllComments, getComments };
