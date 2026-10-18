import * as postRepository from "../repositories/post.repository.js";

export const createPost = async (data) => {
  return await postRepository.createPost(data);
};

export const getPosts = async () => {
  return await postRepository.getPosts();
};
