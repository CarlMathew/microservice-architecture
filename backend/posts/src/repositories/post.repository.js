import Post from "../models/post.model.js";

export const createPost = async (data) => {
  return await Post.create(data);
};

export const getPosts = async () => {
  return await Post.findAll();
};
